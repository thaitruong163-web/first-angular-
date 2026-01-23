import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { map, throwError } from 'rxjs';
import { User } from '../models/user.model';

@Injectable({ providedIn: 'root' })
export class AuthService {
    private readonly STORAGE_KEY = 'current_user';

    constructor(private http: HttpClient) { }

    login(username: string, password: string) {
        // password chưa dùng vì là giả lập
        return this.http.get<any>('https://dummyjson.com/users').pipe(
            map(res => {
                const u = res.users.find((x: any) => x.username === username);
                if (!u) {
                    throw new Error('User not found');
                }

                // GIẢ LẬP ROLE
                const user: User = {
                    id: u.id,
                    username: u.username,
                    role: username === 'emilys' ? 'admin' : 'user'
                };

                localStorage.setItem(this.STORAGE_KEY, JSON.stringify(user));
                return user;
            })
        );
    }

    getCurrentUser(): User | null {
        const raw = localStorage.getItem(this.STORAGE_KEY);
        return raw ? JSON.parse(raw) : null;
    }

    isLoggedIn(): boolean {
      return this.getCurrentUser() !==null;
    }


    isAdmin(): boolean {
        return this.getRole() === 'admin';
    }

    logout() {
        localStorage.removeItem(this.STORAGE_KEY);
    }
    getRole(): 'admin' | 'user' | null {
      return this.getCurrentUser()?.role ?? null;
    }

}
