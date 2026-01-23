// src/app/auth/role-guard.service.ts
import { Injectable } from '@angular/core';
import { Router,CanActivate,ActivatedRouteSnapshot } from '@angular/router';
import { AuthService } from './auth.service';
import { jwtDecode } from 'jwt-decode';

@Injectable()
export class RoleGuardService implements CanActivate {
  constructor(public auth: AuthService, public router: Router) {}
  canActivate(route: ActivatedRouteSnapshot): boolean {
    
    // lấy role từ routing
    const expectedRole = route.data['expectedRole'];
    // lấy token 
    const token = localStorage.getItem('token');
    
    const tokenPayload:any = jwtDecode('token');
    //check login và role
    if (
      !this.auth.isLoggedIn() || 
      tokenPayload.role !== expectedRole
    ) {
      this.router.navigate(['login']);
      return false;
    }
    return true;
  }
}
