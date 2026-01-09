import { Routes } from '@angular/router';
import { LoginComponent } from './login/login.component';
import { ForgotPassword } from './login/forgot-password/forgot-password';
import { RegisterComponent } from './login/register/register.component';
import { AuthGuardService } from './shared/auth/auth-guard.service';
import { AdminComponent } from './admin/admin.component';
import { UserComponent } from './user/user.component';
import { DashboardComponent } from './dashboard/dashboard.component';


export const routes: Routes = [

  { path: 'login', component: LoginComponent },
  { path: 'login/forgot-password', component: ForgotPassword },
  { path: 'login/register', component: RegisterComponent },
  
  {
    path: 'dashboard',
    component: DashboardComponent,
    canActivate: [AuthGuardService]
  },

  {
    path: 'admin',
    component: AdminComponent,
    canActivate: [AuthGuardService],
    data: { roles: ['admin'] }
  },

  {
    path: 'user',
    component: UserComponent,
    canActivate: [AuthGuardService],
    data: { roles: ['user', 'admin'] }
  },

  { path: '**', redirectTo: '/login' }

]