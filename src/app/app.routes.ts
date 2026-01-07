import { Routes, CanActivate } from '@angular/router';
import { LoginComponent } from './login/login.component';
import { ForgotPassword } from './login/forgot-password/forgot-password';
import {RegisterComponent} from './login/register/register.component';
import { AuthGuardService as AuthGuard } from './auth/auth-guard.service';


export const routes: Routes = [
  { path: 'login', component: LoginComponent },
  { path: 'login/forgot-password', component: ForgotPassword },
  { path: 'login/register', component: RegisterComponent },
  { path: '', redirectTo: 'login', pathMatch: 'full' },
  { path: '', redirectTo: 'register', pathMatch: 'full' },

  { path: '', component: LoginComponent },
  { path: 'login', component: LoginComponent, canActivate: [AuthGuard] },
  { path: '**', redirectTo: '' }
];
