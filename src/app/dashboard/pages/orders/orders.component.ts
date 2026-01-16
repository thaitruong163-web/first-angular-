import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { OrderService } from '../../../shared/service/order.service';
import { Order } from '../../../shared/models/order.model';
import { RouterModule } from '@angular/router';
import { FormsModule } from '@angular/forms'

@Component({
  selector: 'app-orders',
  standalone: true,
  imports: [CommonModule, RouterModule, FormsModule],
  templateUrl: './orders.component.html'
})
export class OrdersComponent implements OnInit {
  orders: Order[] = [];
  filteredOrders: Order[] = [];
  statusFilter: string = 'all';

  constructor(private orderService: OrderService) {}

  ngOnInit() {
    this.orderService.getAll().subscribe(data => {
    this.orders = data;
    console.log('ORDERS PAGE:', data);
    this.applyFilter();
  });
  }

  applyFilter() {
    if (this.statusFilter === 'all') {
      this.filteredOrders = this.orders;
    } else {
      this.filteredOrders = this.orders.filter(
        o => o.status === this.statusFilter
      );
    }
  }
}
