import { Component } from '@angular/core';
import { RouterOutlet, } from '@angular/router';
import { HeaderComponent } from './layout/header.component';

@Component({
  standalone: true,
  selector: 'app-dashboard',
  imports: [RouterOutlet, HeaderComponent],
  templateUrl: './dashboard.component.html',
})
export class DashboardComponent {}