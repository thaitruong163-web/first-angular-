import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { OrderService } from '../../../shared/service/order.service';
import { Order } from '../../../shared/models/order.model';
import { CommonModule } from '@angular/common';

@Component({
  standalone: true,
  selector: 'app-order-detail',
  imports: [CommonModule],
  templateUrl: './order-detail.component.html'
})
export class OrderDetailComponent implements OnInit {
  order?: Order;

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private orderService: OrderService
  ) {}

  ngOnInit() {
    const id = Number(this.route.snapshot.paramMap.get('id'));
    this.orderService.getAll().subscribe(orders => {
      this.order = orders.find(o => o.id === id);
    })
  }

  changeStatus(status: 'completed' | 'cancelled'){
    if (!this.order) return;

    if (status === 'cancelled'){
      const ok = confirm ('Bạn có chắc muốn hủy đơn này');
      if (!ok) return ;
    }

    this.orderService.updateStatus(this.order.id, status);
    this.order = {
      ...this.order, status
    };
  }
}
