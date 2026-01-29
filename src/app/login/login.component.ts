import { Component, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Router, RouterLink, ActivatedRoute } from '@angular/router';
import { UserService } from '../shared/service/user.service';
import { AuthService } from '../shared/auth/auth.service';

@Component({
  standalone: true,
  selector: 'app-login',
  imports: [FormsModule, RouterLink],
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {

  username: string = '';
  password: string = '';
  errorMessage: string = '';
  redirect: string = '';

  constructor(
    private userService: UserService,
    private authService: AuthService,
    private router: Router,
    private route: ActivatedRoute
  ) {}

  ngOnInit() {
    // Check queryParams for redirect URL
    this.route.queryParams.subscribe(params => {
      this.redirect = params['redirect'] || '';
    });
  }

  onLogin() {
    this.authService.login(this.username, this.password).subscribe({
      next: () => {
        if (this.redirect) {
          this.router.navigateByUrl(this.redirect);
        } else {
          this.router.navigate(['/dashboard']);
        }
      },
      error: () => {
        this.errorMessage = 'Sai username hoặc password';
      }
    });
  }

}