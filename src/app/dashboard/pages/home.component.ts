import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AuthService } from './../../shared/auth/auth.service';

@Component({
  standalone: true,
  selector: 'app-home',
  imports: [CommonModule],
  templateUrl: './home.component.html',
  
})
export class HomeComponent {
  username: string | null ='';
  role: string | null ='';

  constructor (private auth: AuthService){
    const user = this .auth.getRole();
    this.role = user;
  }
}
