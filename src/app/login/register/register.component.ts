import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators, FormsModule } from '@angular/forms';
import { UserService } from '../../shared/service/user.service';
import { Router } from '@angular/router';

@Component({
  standalone: true,
  selector: 'app-register',
  imports: [FormsModule],
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss']
})

export class RegisterComponent {
  username = '';
  password = '';
  confirmPassword = '';
  errorMessage = '';

  registerForm: FormGroup;

  constructor(
    private userService: UserService,
    private router: Router,
    private fb: FormBuilder
  ) {
    this.registerForm = this.fb.group({
      username: ['',[Validators.required, Validators.minLength(3)]],
      password: ['',[
        Validators.required,
        Validators.pattern('^(?=.*[A-Za-z])(?=.*\\d)[A-Za-z\\d]{6,}$')
      ]],
    });
  }

  onRegister() {
    console.log('REGISTER SUCCESS', {
      username: this.username
    });
  
    this.userService.register(this.username, this.password).subscribe({
      next: () => {
        alert('Đăng ký thành công');
        this.router.navigate(['/login']);
      },
      error: () => {
        this.errorMessage = 'Đăng ký thất bại';
      }
    });
    
  }
}
