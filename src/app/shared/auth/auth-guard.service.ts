// src/app/auth/auth-guard.service.ts
import { Injectable } from '@angular/core';
import { Router, CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot} from '@angular/router';
import { AuthService } from './auth.service';

@Injectable({
  providedIn: 'root',
})

export class AuthGuardService implements CanActivate {
  constructor(public auth: AuthService, public router: Router) {}

  canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): boolean {

    //check token
    if (!this.auth.isLoggedIn()) {
      this.router.navigate(['/login'], {
        queryParams: { redirect: state.url }
      });
      return false;
    }
    
    //check role
    const allowedRoles = route.data['roles'] as string[];
    if (allowedRoles && allowedRoles.length > 0) {
      const user = this.auth.getCurrentUser();

      if (!user || !allowedRoles.includes(user.role)) {
        this.router.navigate(['/login']);
        return false;
      }
    }
    return true;
  }
}