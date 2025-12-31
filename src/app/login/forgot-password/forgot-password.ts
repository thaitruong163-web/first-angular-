import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';

@Component({
  standalone: true,
  selector: 'app-forgot-password',
  imports: [FormsModule],
  templateUrl: './forgot-password.html',
})
export class ForgotPassword {
  email = '';

  onSubmit() {
    console.log('Reset password cho:', this.email);
  }
}
