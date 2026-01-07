import { Component, OnInit, OnDestroy } from '@angular/core';
import { FormBuilder, FormGroup, Validators, FormsModule } from '@angular/forms';
import { UserService } from '../../shared/service/user.service';
import { Router } from '@angular/router';
import { Subscription } from 'rxjs';

@Component({
  standalone: true,
  selector: 'app-register',
  imports: [FormsModule],
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss']
  
})

export class RegisterComponent implements OnInit, OnDestroy {
  username = '';
  password = '';
  confirmPassword = '';
  errorMessage = '';
  sub$ = new Subscription();

  registerForm!: FormGroup;
// giữ subscription khi tạo ra subscribe
  private registerSub!: Subscription;

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
    this.sub$.add(this.registerSub);
  }

  //hủy subscription
  ngOnDestroy(): void {
    this.sub$.unsubscribe();
  }
}
