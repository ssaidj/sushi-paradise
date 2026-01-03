import { Component, OnInit, OnDestroy, ChangeDetectorRef } from '@angular/core';
import { CommonModule } from '@angular/common';
import { BaseChartDirective } from 'ng2-charts';
import { 
  Chart, 
  ChartConfiguration, 
  ChartData, 
  ChartType,
  CategoryScale,
  LinearScale,
  BarElement,
  LineElement,
  PointElement,
  ArcElement,
  Title,
  Tooltip,
  Legend,
  BarController,
  LineController,
  DoughnutController,
  Filler
} from 'chart.js';
import { OrderService, Order } from '../../services/order.service';
import { AuthService } from '../../services/auth.service';

// Enregistrer les composants Chart.js
Chart.register(
  CategoryScale,
  LinearScale,
  BarElement,
  LineElement,
  PointElement,
  ArcElement,
  Title,
  Tooltip,
  Legend,
  BarController,
  LineController,
  DoughnutController,
  Filler
);

interface MonthlyStats {
  month: string;
  orderCount: number;
  revenue: number;
}

@Component({
  selector: 'app-statistics',
  standalone: true,
  imports: [CommonModule, BaseChartDirective],
  templateUrl: './statistics.html',
  styleUrl: './statistics.css'
})
export class Statistics implements OnInit, OnDestroy {
  orders: Order[] = [];
  loading = false; // Désactivé pour éviter le chargement infini
  errorMessage = '';
  
  // Statistiques globales
  totalOrders = 0;
  totalRevenue = 0;
  averageOrderValue = 0;
  
  // Graphique: Nombre de commandes par mois
  public ordersChartData: ChartData<'bar'> = {
    labels: [],
    datasets: [{
      data: [],
      label: 'Nombre de commandes',
      backgroundColor: '#FF6B35',
      borderColor: '#FF6B35',
      borderWidth: 2
    }]
  };

  public ordersChartOptions: ChartConfiguration['options'] = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      legend: {
        display: true,
        position: 'top'
      },
      title: {
        display: true,
        text: 'Évolution des commandes par mois'
      }
    },
    scales: {
      y: {
        beginAtZero: true,
        ticks: {
          stepSize: 1
        }
      }
    }
  };

  public ordersChartType: ChartType = 'bar';

  // Graphique: Chiffre d'affaires par mois
  public revenueChartData: ChartData<'line'> = {
    labels: [],
    datasets: [{
      data: [],
      label: 'Chiffre d\'affaires (€)',
      borderColor: '#4CAF50',
      backgroundColor: 'rgba(76, 175, 80, 0.1)',
      fill: true,
      tension: 0.4,
      borderWidth: 3,  // Ligne plus épaisse
      pointRadius: 6,  // Points plus gros
      pointHoverRadius: 8  // Points encore plus gros au survol
    }]
  };

  public revenueChartOptions: ChartConfiguration['options'] = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      legend: {
        display: true,
        position: 'top'
      },
      title: {
        display: true,
        text: 'Évolution du chiffre d\'affaires par mois'
      }
    },
    scales: {
      y: {
        beginAtZero: true,
        ticks: {
          callback: function(value) {
            return value + '€';
          }
        }
      }
    }
  };

  public revenueChartType: ChartType = 'line';

  // Graphique: Statut des commandes (seulement 2 statuts: Terminée et En attente)
  public statusChartData: ChartData<'doughnut'> = {
    labels: ['Terminée', 'En attente'],
    datasets: [{
      data: [0, 0],
      backgroundColor: [
        '#66BB6A',
        '#FFA726'
      ]
    }]
  };

  public statusChartOptions: ChartConfiguration['options'] = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      legend: {
        display: true,
        position: 'right'
      },
      title: {
        display: true,
        text: 'Répartition des commandes par statut'
      }
    }
  };

  public statusChartType: ChartType = 'doughnut';

  constructor(
    private orderService: OrderService,
    public authService: AuthService,
    private cdr: ChangeDetectorRef
  ) {}

  ngOnInit(): void {
    console.log('🔄 [Statistics] ngOnInit called');
    this.loadStatistics();
  }

  ngOnDestroy(): void {
    console.log('🗑️ [Statistics] Component destroyed');
  }

  loadStatistics(): void {
    console.log('🔍 [Statistics] Starting to load statistics...');
    
    const user = this.authService.getCurrentUser();
    console.log('👤 [Statistics] Current user:', user);
    
    if (!user || !user.id) {
      console.log('❌ [Statistics] No user found');
      this.loading = false;
      this.errorMessage = 'Vous devez être connecté pour voir les statistiques';
      return;
    }

    console.log('📡 [Statistics] Calling API for user ID:', user.id);

    // Timeout de 10 secondes
    const timeout = setTimeout(() => {
      if (this.loading) {
        console.log('⏱️ [Statistics] Timeout reached!');
        this.loading = false;
        this.errorMessage = 'Le chargement a pris trop de temps. Vérifiez votre connexion API.';
      }
    }, 10000);

    this.orderService.getOrders(user.id).subscribe({
      next: (orders) => {
        clearTimeout(timeout);
        console.log('✅ [Statistics] Orders received:', orders);
        this.orders = orders || [];
        console.log('📊 [Statistics] Number of orders:', this.orders.length);
        
        if (this.orders.length > 0) {
          this.calculateStatistics();
        }
        this.loading = false;
        
        // Attendre le prochain cycle de rendu du navigateur avant de forcer la détection
        requestAnimationFrame(() => {
          this.cdr.detectChanges();
        });
      },
      error: (err) => {
        clearTimeout(timeout);
        console.error('❌ [Statistics] Error loading statistics:', err);
        this.errorMessage = 'Impossible de charger les statistiques. Vérifiez que l\'API est accessible.';
        this.loading = false;
      }
    });
  }

  calculateStatistics(): void {
    // Statistiques globales
    this.totalOrders = this.orders.length;
    console.log('📊 Total orders:', this.totalOrders);
    console.log('📊 Orders data:', this.orders);
    
    this.totalRevenue = this.orders.reduce((sum, order) => {
      const price = Number(order.total_price) || 0;
      console.log('Order total_price:', order.total_price, '→', price);
      return sum + price;
    }, 0);
    
    console.log('💰 Total revenue:', this.totalRevenue);
    this.averageOrderValue = this.totalOrders > 0 ? this.totalRevenue / this.totalOrders : 0;
    console.log('📊 Average order value:', this.averageOrderValue);

    // Grouper par mois
    const monthlyData = this.groupByMonth();

    // Mettre à jour le graphique des commandes (créer un nouvel objet pour forcer la détection)
    this.ordersChartData = {
      labels: [...monthlyData.map(m => m.month)],
      datasets: [{
        data: [...monthlyData.map(m => m.orderCount)],
        label: 'Nombre de commandes',
        backgroundColor: '#FF6B35',
        borderColor: '#FF6B35',
        borderWidth: 2
      }]
    };

    // Mettre à jour le graphique du chiffre d'affaires (créer un nouvel objet pour forcer la détection)
    this.revenueChartData = {
      labels: [...monthlyData.map(m => m.month)],
      datasets: [{
        data: [...monthlyData.map(m => m.revenue)],
        label: 'Chiffre d\'affaires (€)',
        borderColor: '#4CAF50',
        backgroundColor: 'rgba(76, 175, 80, 0.1)',
        fill: true,
        tension: 0.4
      }]
    };

    // Calculer les statuts
    this.calculateStatusDistribution();

    // Attendre le prochain cycle de rendu du navigateur
    requestAnimationFrame(() => {
      this.cdr.detectChanges();
    });
  }

  groupByMonth(): MonthlyStats[] {
    const monthsMap = new Map<string, { orderCount: number; revenue: number }>();

    this.orders.forEach(order => {
      const date = new Date(order.created_at);
      const monthKey = this.getMonthLabel(date);

      if (!monthsMap.has(monthKey)) {
        monthsMap.set(monthKey, { orderCount: 0, revenue: 0 });
      }

      const stats = monthsMap.get(monthKey)!;
      stats.orderCount++;
      // Convertir total_price en nombre
      stats.revenue += Number(order.total_price) || 0;
    });

    return Array.from(monthsMap.entries())
      .map(([month, stats]) => ({
        month,
        orderCount: stats.orderCount,
        revenue: stats.revenue
      }))
      .sort((a, b) => {
        const [aMonth, aYear] = a.month.split(' ');
        const [bMonth, bYear] = b.month.split(' ');
        // Custom sorting logic to handle month names and year
        const monthOrder = ['Jan', 'Fév', 'Mar', 'Avr', 'Mai', 'Juin', 'Juil', 'Août', 'Sep', 'Oct', 'Nov', 'Déc'];
        const yearComparison = parseInt(aYear) - parseInt(bYear);
        if (yearComparison !== 0) {
          return yearComparison;
        }
        return monthOrder.indexOf(aMonth) - monthOrder.indexOf(bMonth);
      });
  }

  getMonthLabel(date: Date): string {
    const months = ['Jan', 'Fév', 'Mar', 'Avr', 'Mai', 'Juin', 'Juil', 'Août', 'Sep', 'Oct', 'Nov', 'Déc'];
    return `${months[date.getMonth()]} ${date.getFullYear()}`;
  }

  calculateStatusDistribution(): void {
    // Compter seulement 2 statuts: completed et pending
    const statusCounts = {
      'completed': 0,
      'pending': 0
    };

    this.orders.forEach(order => {
      const status = order.status.toLowerCase();
      if (status === 'completed') {
        statusCounts.completed++;
      } else if (status === 'pending') {
        statusCounts.pending++;
      }
      // Ignorer les autres statuts (processing, cancelled, etc.)
    });

    // Créer un nouvel objet pour forcer la détection de changement
    this.statusChartData = {
      labels: ['Terminée', 'En attente'],
      datasets: [{
        data: [
          statusCounts.completed,
          statusCounts.pending
        ],
        backgroundColor: [
          '#66BB6A',
          '#FFA726'
        ]
      }]
    };
  }
}
