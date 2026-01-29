import { Routes } from '@angular/router';
import { LoginComponent } from './login/login.component';
import { ForgotPassword } from './login/forgot-password/forgot-password';
import { RegisterComponent } from './login/register/register.component';
import { AuthGuardService } from './shared/auth/auth-guard.service';
import { DashboardComponent } from './dashboard/dashboard.component';


export const routes: Routes = [

  { path: 'login', component: LoginComponent },
  { path: 'login/forgot-password', component: ForgotPassword },
  { path: 'login/register', component: RegisterComponent },

  {
    path: 'product/:id',
    loadComponent: () => import('./dashboard/pages/product-detail/product-detail.component').then(m => m.ProductDetailComponent)
  },

  {
    path: 'dashboard',
    component: DashboardComponent,
    canActivate: [AuthGuardService],
    children: [
      { path: '', redirectTo: 'home', pathMatch: 'full' },
      {
        path: 'home',
        loadComponent: () => import('./dashboard/pages/home/home.component').then(m => m.HomeComponent)
      },

      {
        path: 'products',
        loadComponent: () => import('./dashboard/pages/products/products.component').then(m => m.ProductsComponent),
      },

      {
        path: 'products/:id',
        loadComponent: () => import('./dashboard/pages/product-detail/product-detail.component').then(m => m.ProductDetailComponent),
      },

      {
        path: 'orders',
        loadComponent: () => import('./dashboard/pages/orders/orders.component').then(m => m.OrdersComponent),
        canActivate: [AuthGuardService],
        data: { roles: ['admin', 'user'] }
      },

      {
        path: 'orders/:id',
        loadComponent: () => import('./dashboard/pages/order-detail/order-detail.component').then(m => m.OrderDetailComponent),
        canActivate: [AuthGuardService],
        data: { roles: ['admin', 'user'] }
      },
    ]
  },

  { path: '**', redirectTo: 'login', pathMatch: 'full' }

]