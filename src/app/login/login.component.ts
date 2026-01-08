import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Router, RouterLink } from '@angular/router';
import { UserService } from '../shared/service/user.service';
import { AuthMockService } from '../shared/auth/auth-mock.service';

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
    private authMock: AuthMockService,
    private router: Router
  ) {}

  onLogin() {

    this.authMock.login(this.username, this.password).subscribe(() => {
      this.router.navigate(['/dashboard']);
    });
    

    this.userService.login(this.username, this.password).subscribe({
      next: (res) => {
        console.log('Login thành công', res);

        localStorage.setItem('token', res.token);

        this.router.navigate(['/home']);
      },
      error: () => {
        this.errorMessage = 'Sai username hoặc password';
      }
    });
  }
}
