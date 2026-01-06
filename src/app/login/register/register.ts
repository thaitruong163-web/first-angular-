import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';

@Component({
  standalone: true,
  selector: 'app-register',
  imports: [FormsModule],
  templateUrl: './register.html',
})
export class Register {
  email = '';
  password = '';
  confirmPassword = '';

  onRegister() {
    console.log('Email:', this.email);
    console.log('Password:', this.password);
    console.log('Confirm:', this.confirmPassword);
  }
}
