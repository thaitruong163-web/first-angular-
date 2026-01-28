import { Component } from '@angular/core';
import { RouterOutlet, } from '@angular/router';
import { HeaderComponent } from './layout/header.component';
import { SidebarComponent } from './layout/sidebar.component';

@Component({
  standalone: true,
  selector: 'app-dashboard',
  imports: [RouterOutlet, HeaderComponent, SidebarComponent],
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss']
})
export class DashboardComponent {
  ngOnInit() {
    console.log('Dashboard component loaded');
  }
}