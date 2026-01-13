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
    path:'dashboard',
    component: DashboardComponent,
    canActivate: [AuthGuardService],
    children: [
      { path:'', redirectTo: 'home', pathMatch: 'full' },
      {
        path:'home',
        loadComponent: () => import('./dashboard/pages/home.component').then(m => m.HomeComponent)
      },
    ]
  },

  { path: '**', redirectTo: 'login' }

]