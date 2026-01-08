import { Component, OnInit, OnDestroy } from '@angular/core';
import { FormBuilder, FormGroup, Validators, ReactiveFormsModule } from '@angular/forms';
import { UserService } from '../../shared/service/user.service';
import { Router } from '@angular/router';
import { Subscription } from 'rxjs';

@Component({
  standalone: true,
  selector: 'app-register',
  imports: [ReactiveFormsModule],
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss']
  
})

export class RegisterComponent implements OnInit, OnDestroy {
  username = '';
  password = '';
  errorMessage = '';
  registerForm!: FormGroup;
  // subscription tổng
  sub$ = new Subscription();

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
      username: ['',[Validators.required, Validators.minLength(3)]],
      password: ['',[
        Validators.required,
        Validators.pattern(this.passwordPattern())
      ]],
    });
  }
  private passwordPattern(): RegExp {
    return /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d).{6,}$/;
  }

  onRegister() {
    if (this.registerForm.invalid) return;
    const { username, password } = this.registerForm.value;
    console.log('REGISTER SUCCESS: ', username);

    const sampleSub$ = this.userService.register(this.username, this.password).subscribe({
      next: () => {
        alert('Đăng ký thành công');
        this.router.navigate(['/login']);
      },
      error: () => {
        this.errorMessage = 'Đăng ký thất bại';
      }
    });
    this.sub$.add(sampleSub$);
  }

  //hủy subscription
  ngOnDestroy(): void {
    this.sub$.unsubscribe();
  }
}
