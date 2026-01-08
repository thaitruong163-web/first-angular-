// src/app/auth/auth-guard.service.ts
import { Injectable } from '@angular/core';
import { Router, CanActivate, ActivatedRouteSnapshot} from '@angular/router';
import { AuthService } from './auth.service';

@Injectable({
  providedIn: 'root',
})

export class AuthGuardService implements CanActivate {
  constructor(public auth: AuthService, public router: Router) {}

  canActivate(route: ActivatedRouteSnapshot): boolean {
    //check token
    if (!this.auth.isAuthenticated()) {
      this.router.navigate(['login']);
      return false;
    }
    //check role
    const allowedRoles = route.data['roles'] as string[];
    if (allowedRoles && allowedRoles.length > 0) {
      const userRole = this.auth.getRole();

      if (!userRole || !allowedRoles.includes(userRole)) {
        this.router.navigate(['login']);
        return false;
      }
    }

    return true;

  }
}
