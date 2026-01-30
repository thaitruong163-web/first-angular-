import { Injectable, Inject, PLATFORM_ID } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { isPlatformBrowser } from '@angular/common';
import { map } from 'rxjs';
import { Router } from '@angular/router';
import { User } from '../models/user.model';

const DUMMY_HTTP = 'https://dummyjson.com/users';
const ADMIN_USERNAME = 'emilys';

@Injectable({ providedIn: 'root' })
export class AuthService {

    private readonly STORAGE_KEY = 'current_user';
    private isBrowser: boolean;

    constructor(
        private http: HttpClient,
        private router: Router,
        @Inject(PLATFORM_ID) private platformId: Object
    ) {
        this.isBrowser = isPlatformBrowser(this.platformId);
    }

    login(username: string, password: string) {
        return this.http.get<any>(DUMMY_HTTP).pipe(
            map(res => {
                const u = res.users.find((x: any) => x.username === username);
                if (!u) {
                    throw new Error('User not found');
                }

                const user: User = {
                    id: u.id,
                    username: u.username,
                    role: username === ADMIN_USERNAME ? 'admin' : 'user'
                };

                if (this.isBrowser) {
                    localStorage.setItem(this.STORAGE_KEY, JSON.stringify(user));
                }

                return user;
            })
        );
    }

    getCurrentUser(): User | null {
        if (!this.isBrowser) return null;

        const user = localStorage.getItem(this.STORAGE_KEY);
        return user ? JSON.parse(user) : null;
    }

    isLoggedIn(): boolean {
        return !!this.getCurrentUser();
    }

    getRole(): 'admin' | 'user' | null {
        return this.getCurrentUser()?.role ?? null;
    }

    isAdmin(): boolean {
        return this.getRole() === 'admin';
    }

    logout() {
        if (this.isBrowser) {
            localStorage.removeItem(this.STORAGE_KEY);
        }
        this.router.navigate(['/login']);
    }
}
