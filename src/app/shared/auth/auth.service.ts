// src/app/shared/auth/auth.service.ts

import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { JwtHelperService } from '@auth0/angular-jwt';
import { tap } from 'rxjs/operators';
import { UserState } from '../state/user.state';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  private LOGIN_API = 'https://dummyjson.com/auth/login';

  constructor(
    private http: HttpClient,
    private jwtHelper: JwtHelperService,
    private userState: UserState
  ) {}

  // LOGIN
  login(username: string, password: string) {
    return this.http.post<any>(this.LOGIN_API, {
      username,
      password
    }).pipe(
      tap(res => {
        localStorage.setItem('token', res.token);

        this.userState.setUser({
          id: res.id,
          username: res.username,
          role: res.role ?? 'user'
        });
      })
    );
  }

  // kiểm tra đăng nhập
  isAuthenticated(): boolean {
    const token = localStorage.getItem('token');
    return !!token;
  }

  // lấy role
  getRole(): string | null {
    return this.userState.getUser()?.role ?? null;
  }
}
