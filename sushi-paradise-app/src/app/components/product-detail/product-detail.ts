import { Component, OnInit, ChangeDetectorRef } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { ActivatedRoute, Router, RouterModule } from '@angular/router';
import { CartService } from '../../services/cart.service';
import { BoxService } from '../../services/box.service';
import { Box } from '../../models/models';

@Component({
  selector: 'app-product-detail',
  imports: [CommonModule, RouterModule, FormsModule],
  templateUrl: './product-detail.html',
  styleUrl: './product-detail.css',
})
export class ProductDetail implements OnInit {
  box: Box | null = null;
  quantity: number = 1;
  boxType: string | null = null; // 'small', 'large', ou null (page d'accueil)

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private cartService: CartService,
    private boxService: BoxService,
    private cdr: ChangeDetectorRef
  ) {}

  ngOnInit(): void {
    const id = Number(this.route.snapshot.paramMap.get('id'));
    this.boxType = this.route.snapshot.queryParamMap.get('boxType');
    
    this.boxService.getBoxById(id).subscribe({
      next: (box) => {
        // Appliquer les transformations selon le type de box
        if (this.boxType === 'small') {
          // Petites boxes : -40% + préfixe "Mini " + adapter description
          const adaptedFoods = box.foods?.map(food => ({
            ...food,
            quantity: Math.ceil(food.quantity / 2)
          }));
          
          this.box = {
            ...box,
            name: 'Mini ' + box.name,
            price: box.price * 0.6,
            description: this.generateDescriptionFromFoods(adaptedFoods, 'small'),
            foods: adaptedFoods,
            size: 'small'
          };
        } else if (this.boxType === 'large') {
          // Grandes boxes : +30% + préfixe "Grande " + adapter description et foods
          const adaptedFoods = box.foods?.map(food => ({
            ...food,
            quantity: Math.ceil(food.quantity * 1.3)
          }));
          
          this.box = {
            ...box,
            name: 'Grande ' + box.name,
            price: box.price * 1.3,
            description: this.generateDescriptionFromFoods(adaptedFoods, 'large'),
            foods: adaptedFoods,
            size: 'large'
          };
        } else if (this.boxType === 'student') {
          // Offres étudiantes : -10%
          this.box = {
            ...box,
            price: box.price * 0.9,
            isStudentOffer: true
          };
        } else {
          // Page d'accueil : pas de transformation
          this.box = box;
        }
        
        this.cdr.detectChanges();
      },
      error: (err) => {
        console.error('Error loading box:', err);
        this.box = null;
      }
    });
  }

  /**
   * Adapte la description pour les petites boxes en réduisant les quantités
   */
  private adaptDescriptionForSmall(description: string): string {
    if (!description) {
      return '';
    }
    
    try {
      return description
        .replace(/(\d+)\s+/g, (match, number) => {
          const reduced = Math.ceil(parseInt(number) / 2);
          return reduced + ' ';
        })
        .replace('Quantité :', 'Quantité réduite :');
    } catch (error) {
      console.error('Error adapting description:', error);
      return description;
    }
  }

  /**
   * Adapte la description pour les grandes boxes en augmentant les quantités
   */
  private adaptDescriptionForLarge(description: string): string {
    if (!description) {
      return '';
    }
    
    try {
      return description
        .replace(/(\d+)\s+/g, (match, number) => {
          const increased = Math.ceil(parseInt(number) * 1.3); // Augmentation de 30%
          return increased + ' ';
        })
        .replace('Quantité :', 'Grande quantité :');
    } catch (error) {
      console.error('Error adapting description:', error);
      return description;
    }
  }

  /**
   * Génère une description basée sur le tableau foods
   */
  private generateDescriptionFromFoods(foods: { name: string; quantity: number }[] | undefined, sizeType: string): string {
    if (!foods || foods.length === 0) {
      return 'Une délicieuse box de sushis fraîchement préparés.';
    }

    const quantityLabel = sizeType === 'small' ? 'Quantité réduite :' : 
                         sizeType === 'large' ? 'Grande quantité :' : 
                         'Quantité :';
    
    const itemsList = foods
      .map(food => `${food.quantity} ${food.name}`)
      .join(', ');
    
    return `${quantityLabel} ${itemsList}`;
  }

  /**
   * Retourne une description unique pour chaque produit
   */
  getProductDescription(): string {
    if (!this.box) return '';
    
    const descriptions: { [key: string]: string } = {
      'Tasty Blend': 'Un mélange harmonieux de saveurs marines et terrestres. Cette box allie la fraîcheur du saumon avec la douceur de l\'avocat et du fromage pour une expérience gustative équilibrée.',
      'Amateur Mix': 'Idéal pour découvrir les sushis ! Un assortiment varié et accessible pour initier votre palais aux délices japonais en toute douceur.',
      'Saumon Original': 'L\'authenticité à l\'état pur. Des pièces de saumon d\'une fraîcheur incomparable, préparées selon la tradition pour les puristes.',
      'Salmon Lovers': 'Pour les vrais amateurs de saumon ! Une sélection généreuse de sushis et makis au saumon frais, sublimés par l\'onctuosité de l\'avocat.',
      'Salmon Classic': 'Les incontournables du saumon réunis dans une box. Simplicité et efficacité pour un repas sain et gourmand.',
      'Master Mix': 'L\'expertise de nos maîtres sushis dans une boîte. Des compositions audacieuses et raffinées pour les palais exigeants.',
      'Sunrise': 'Illuminez votre repas avec cette box aux couleurs et saveurs éclatantes. Un festival de fraîcheur qui éveille les sens.',
      'Sando Box Chicken Katsu': 'Le sandwich japonais revisité ! Du poulet pané croustillant (Katsu) dans un pain moelleux, accompagné de sa sauce spéciale.',
      'Sando Box Salmon Aburi': 'Une expérience unique de Sando avec du saumon mi-cuit (Aburi). Le mariage parfait entre le fondant du saumon snacké et le croquant des crudités.',
      'Super Salmon': 'Une avalanche de saumon pour les grandes faims ! Sushi, maki, sashimi... le saumon sous toutes ses formes en quantité généreuse.',
      'California Dream': 'Le rêve californien à portée de baguette. Une variété de California Rolls créatifs et savoureux pour une évasion gourmande.',
      'Gourmet Mix': 'Une sélection prestige pour les grandes occasions. Les meilleurs morceaux et les créations les plus fines pour un moment de dégustation inoubliable.',
      'Fresh Mix': 'La fraîcheur avant tout ! Un assortiment léger et vivifiant, parfait pour un déjeuner sain et énergisant.'
    };

    // Enlever les préfixes "Mini " ou "Grande " pour retrouver le nom original
    const baseName = this.box.name.replace(/^(Mini |Grande )/, '');
    
    return descriptions[baseName] || 'Une délicieuse box de sushis fraîchement préparés.';
  }

  incrementQuantity(): void {
    const currentTotal = this.cartService.getTotalQuantity();
    if (currentTotal + this.quantity < 10) {
      this.quantity++;
    }
  }

  decrementQuantity(): void {
    if (this.quantity > 1) {
      this.quantity--;
    }
  }

  addToCart(): void {
    if (!this.box) return;

    const success = this.cartService.addToCart(this.box, this.quantity);
    
    const notification = document.createElement('div');
    
    if (success) {
      notification.textContent = `✓ ${this.quantity} ${this.box.name} ajouté(s) au panier`;
      notification.style.cssText = 'position:fixed;top:80px;right:20px;background:#4caf50;color:white;padding:15px 20px;border-radius:8px;z-index:9999;';
    } else {
      notification.textContent = `⚠ Limite de 10 produits atteinte`;
      notification.style.cssText = 'position:fixed;top:80px;right:20px;background:#ff9800;color:white;padding:15px 20px;border-radius:8px;z-index:9999;';
    }
    
    document.body.appendChild(notification);
    setTimeout(() => notification.remove(), 2000);
  }
}
