// src/app/auth/auth-guard.service.ts
import { Injectable, Inject, PLATFORM_ID } from '@angular/core';
import { Router, CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot} from '@angular/router';
import { isPlatformBrowser } from '@angular/common';
import { AuthService } from './auth.service';

@Injectable({
  providedIn: 'root',
})

export class AuthGuardService implements CanActivate {
  private isBrowser: boolean;
  constructor(public auth: AuthService, public router: Router, @Inject(PLATFORM_ID) platformId: Object) {
    this.isBrowser = isPlatformBrowser(platformId);
  }

  canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): boolean {
    console.log('AuthGuard checking route:', state.url);
    console.log('Current user:', this.auth.getCurrentUser());
    
    //check token
    if (!this.auth.isLoggedIn()) {
      console.log('Not logged in, redirecting to login');
      localStorage.setItem('redirect_url', state.url); //lưu url bị chặn 
      this.router.navigate(['/login']);
      return false;
    }
    
    console.log('User is logged in');
    
    //check role
    const allowedRoles = route.data['roles'] as string[];
    if (allowedRoles && allowedRoles.length > 0) {
      const user = this.auth.getCurrentUser();

      if (!user || !allowedRoles.includes(user.role)) {
        console.log('User role not allowed:', user?.role, 'Allowed roles:', allowedRoles);
        this.router.navigate(['/login']);
        return false;
      }
      console.log('User role is allowed:', user?.role);
    }
    return true;

  }
}
