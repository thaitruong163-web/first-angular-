// nơi xử lý token và role

import { Injectable } from '@angular/core';
import { JwtHelperService } from '@auth0/angular-jwt';

@Injectable({
  providedIn: 'root',
})

export class AuthService {
  constructor(public jwtHelper: JwtHelperService) {}

  // lấy token từ localStorage
  getToken(): string | null {
    return localStorage.getItem('token');
  }
  // kiểm tra đã đăng nhập hay chưa
  public isAuthenticated(): boolean {
    const token = localStorage.getItem('token');
    if (!token) {
      return false;
    }
    //token hết hạn 
  return !this.jwtHelper.isTokenExpired(token);
  }
  // lấy role từ token
  getRole ():   string | null {
    const token = this.getToken();
    if (!token) {
      return null;
    }

    const decodedToken = this.jwtHelper.decodeToken(token);
    return decodedToken?.role || null;
    
  }
}
