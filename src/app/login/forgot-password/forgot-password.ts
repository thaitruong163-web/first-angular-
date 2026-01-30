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
    // TODO: Implement forgot password logic
  }
}
