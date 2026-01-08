import { Routes } from '@angular/router';
import { LoginComponent } from './login/login.component';
import { ForgotPassword } from './login/forgot-password/forgot-password';
import { RegisterComponent } from './login/register/register.component';
import { AuthGuardService } from './auth/auth-guard.service';


export const routes: Routes = [

  { path: 'login', component: LoginComponent },
  { path: 'login/forgot-password', component: ForgotPassword },
  { path: 'login/register', component: RegisterComponent },
  { path: '**', redirectTo: 'login' },

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

]