import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { User } from '../../shared/models/user.model';

@Injectable({ providedIn: 'root' })
export class UserState {

  // state giữ user hiện tại
  private userSubject = new BehaviorSubject<User | null>(null);

  // observable để component / guard subscribe
  user$ = this.userSubject.asObservable();

  // set user khi login
  setUser(user: User): void {
    this.userSubject.next(user);
  }

  // clear khi logout
  clearUser(): void {
    this.userSubject.next(null);
  }

  // lấy nhanh user hiện tại (guard hay dùng)
  getUser(): User | null {
    return this.userSubject.value;
  }
}
