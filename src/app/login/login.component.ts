import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Router, RouterLink } from '@angular/router';
import { UserService } from '../shared/service/user.service';
import { AuthService } from '../shared/auth/auth.service';

@Component({
  standalone: true,
  selector: 'app-login',
  imports: [FormsModule, RouterLink],
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent {

  username: string = '';
  password: string = '';
  errorMessage: string = '';

  constructor(
    private userService: UserService,
    private authService: AuthService,
    private router: Router
  ) {}

  onLogin() {
    this.authService.login(this.username, this.password).subscribe({
      next: () => {
        const redirect = localStorage.getItem('redirect_url');
        localStorage.removeItem('redirect_url');
        this.router.navigateByUrl(redirect || '/dashboard');

      },
      error: () => {
        this.errorMessage = 'Sai username hoặc password';
      }
    });
  }
}