import { Routes } from '@angular/router';
import { authGuard } from './guards/auth.guard';
import { Home } from './components/home/home';
import { Login } from './components/login/login';
import { Register } from './components/register/register';
import { Catalog } from './components/catalog/catalog';
import { Cart } from './components/cart/cart';
import { Profile } from './components/profile/profile';
import { ProductDetail } from './components/product-detail/product-detail';
import { Checkout } from './components/checkout/checkout';
import { StudentOffers } from './components/student-offers/student-offers';
import { Orders } from './components/orders/orders';
import { Statistics } from './components/statistics/statistics';
import { PrivacyPolicy } from './components/privacy-policy/privacy-policy';

export const routes: Routes = [
  { path: '', component: Home },
  { path: 'login', component: Login },
  { path: 'register', component: Register },
  { path: 'product/:id', component: ProductDetail },
  { path: 'boxes/small', component: Catalog, data: { size: 'small' } },
  { path: 'boxes/large', component: Catalog, data: { size: 'large' } },
  { path: 'student-offers', component: StudentOffers },
  { path: 'cart', component: Cart },
  { path: 'profile', component: Profile, canActivate: [authGuard] },
  { path: 'orders', component: Orders, canActivate: [authGuard] },
  { path: 'statistics', component: Statistics, canActivate: [authGuard] },
  { path: 'privacy-policy', component: PrivacyPolicy },
  { path: 'checkout', component: Checkout, canActivate: [authGuard] },
  { path: '**', redirectTo: '' }
];
