import { Routes } from '@angular/router';
import { LoginComponent } from './login/login.component';
import { ForgotPassword } from './login/forgot-password/forgot-password';
import {RegisterComponent} from './login/register/register.component';

export const routes: Routes = [
  { path: 'login', component: LoginComponent },
  { path: 'login/forgot-password', component: ForgotPassword },
  { path: 'login/register', component: RegisterComponent },
  { path: '', redirectTo: 'login', pathMatch: 'full' },
  { path: '', redirectTo: 'register', pathMatch: 'full' }
];
