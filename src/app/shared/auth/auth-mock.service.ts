import { Injectable } from '@angular/core';
import { of, Observable } from 'rxjs';
import { UserState } from '../state/user.state';
import { User, UserRole } from '../models/user.model';

@Injectable({ providedIn: 'root' })
export class AuthMockService {

  constructor(private userState: UserState) {}

  login(username: string, password: string): Observable<User> {

    const fakeUser: User = {
      username,
      role: username === 'admin'
        ? UserRole.ADMIN
        : UserRole.USER,
      token: 'FAKE_TOKEN'
    };

    // set state (chưa cần JWT)
    this.userState.setUser(fakeUser);

    return of(fakeUser);
  }

  logout(): void {
    this.userState.clearUser();
  }
}
