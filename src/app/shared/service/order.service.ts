import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { Order, OrderStatus } from '../models/order.model';

const STORAGE_KEY = 'orders';

@Injectable({
  providedIn: 'root'
})
export class OrderService {
  private orders$ = new BehaviorSubject<Order[]>([]);

  constructor(){
    const data = localStorage.getItem(STORAGE_KEY);
    if(data){
      this.orders$.next(JSON.parse(data));
    }
  }
  
  getAll() {  
    return this.orders$.asObservable();
  }

  add(order: Order) {
    const current = this.orders$.value;
    this.orders$.next([order, ...current]);
  }

  create(order: Order) {
    const current = this.orders$.value;
    const updated = [...current, order];

    this.orders$.next(updated);
    localStorage.setItem(STORAGE_KEY, JSON.stringify(updated));
  }

  clear(){
    this.orders$.next([]);
    localStorage.removeItem(STORAGE_KEY);
  }

  getById(id: number) {
    return this.orders$.value.find(o => o.id === id);
  }

  updateStatus(id:number, status: OrderStatus){
    const updated = this.orders$.value.map(o =>
      o.id === id ? {...o,status} : o
    );
    this.orders$.next(updated);
    localStorage.setItem('STORAGE_KEY', JSON.stringify(updated));
  }

}
