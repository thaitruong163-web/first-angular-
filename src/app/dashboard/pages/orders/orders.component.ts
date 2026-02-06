import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { OrderService } from '../../../shared/service/order.service';
import { Order } from '../../../shared/models/order.model';
import { RouterModule, Router } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { CartState } from '../../../shared/state/cart.state';

@Component({
  selector: 'app-orders',
  standalone: true,
  imports: [CommonModule, RouterModule, FormsModule],
  templateUrl: './orders.component.html',
  styleUrl: './orders.component.scss'

})
export class OrdersComponent implements OnInit {
  orders: Order[] = [];
  filteredOrders: Order[] = [];
  statusFilter: string = 'all';
  private orderCreated = false;

  constructor(private cartState: CartState, private router: Router, private orderService: OrderService) { }

  ngOnInit() {
    this.orderService.getAll().subscribe(orders => {
      this.orders = orders;
      this.applyFilter();
    });

    this.cartState.getCart().subscribe(cart => {
      if (!cart || this.orderCreated) return;

      const fakeOrder: Order = {
        id: Date.now(),
        totalPrice: cart.total,
        status: 'pending', 
        createdAt: new Date(),
        products: cart.products
      };

      this.orderService.create(fakeOrder);
      this.orderCreated = true;
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

  paymentOrder(orderId: number) {
    this.router.navigate(['/dashboard/orders', orderId]);
  }
}
