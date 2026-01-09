import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { UserState } from '../shared/state/user.state';
import { User } from '../shared/models/user.model';

@Component({
  standalone: true,
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
})
export class DashboardComponent implements OnInit {

  role: User | null = null;

  constructor(
    private userState: UserState,
    private router: Router
  ) {}

  ngOnInit(): void {
    // lấy role từ state
    this.role = this.userState.getRole();
  }

  goAdmin() {
    this.router.navigate(['/admin']);
  }

  goUser() {
    this.router.navigate(['/user']);
  }

  logout() {
    this.userState.clearUser();
    localStorage.removeItem('token');
    this.router.navigate(['/login']);
  }
}
