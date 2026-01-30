import { Component, OnInit, OnDestroy } from '@angular/core';
import { FormBuilder, FormGroup, Validators, ReactiveFormsModule } from '@angular/forms';
import { UserService } from '../../shared/service/user.service';
import { Router } from '@angular/router';
import { Subscription } from 'rxjs';

const PASSWORD_PATTERN = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d).{6,}$/;

@Component({
  standalone: true,
  selector: 'app-register',
  imports: [ReactiveFormsModule],
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss']
})

export class RegisterComponent implements OnInit, OnDestroy {
  errorMessage = '';
  registerForm!: FormGroup;
  private sub$ = new Subscription();

  constructor(
    private userService: UserService,
    private router: Router,
    private fb: FormBuilder
  ) {}

  ngOnInit(): void {
    this.initRegisterForm();
  }

  private initRegisterForm(): void {
    this.registerForm = this.fb.group({
      username: ['', [Validators.required, Validators.minLength(3)]],
      password: ['', [Validators.required, Validators.pattern(PASSWORD_PATTERN)]]
    });
  }

  onRegister(): void {
    if (this.registerForm.invalid) return;
    
    const { username, password } = this.registerForm.value;

    const registerSub$ = this.userService.register(username, password).subscribe({
      next: () => {
        alert('Đăng ký thành công');
        this.router.navigate(['/login']);
      },
      error: () => {
        this.errorMessage = 'Đăng ký thất bại';
      }
    });
    this.sub$.add(registerSub$);
  }

  ngOnDestroy(): void {
    this.sub$.unsubscribe();
  }
}
