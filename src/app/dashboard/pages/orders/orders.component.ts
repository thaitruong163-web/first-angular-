import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { OrderService } from '../../../shared/service/order.service';
import { Order } from '../../../shared/models/order.model';
import { RouterModule } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { CartState } from '../../../shared/state/cart.state';
import { Cart } from '../../../shared/models/cart.model'

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

  constructor(private cartState: CartState) {}

  ngOnInit() {
    this.cartState.getCart().subscribe(cart => {
      if (!cart) return;

      const fakeOrder: Order = {
        id: cart.id,
        totalPrice: cart.total,
        status: 'pending', // mặc định
        createdAt: new Date(),
        products: cart.products
      };

      this.orders = [fakeOrder]; // QUAN TRỌNG
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

  confirmOrder() {
    if (this.orders.length === 0) return;
    this.orders[0].status = 'completed';
    this.applyFilter();
  }

  cancelOrder() {
    this.cartState.clear();
    this.orders = [];
    this.filteredOrders = [];
  }

}
