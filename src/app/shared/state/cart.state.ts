import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { Cart } from '../models/cart.model';



@Injectable({ providedIn: 'root' })
export class CartState {

  private cart$ = new BehaviorSubject<Cart | null>(null);

  getCart() {
    return this.cart$.asObservable();
  }

  setCart(cart: Cart) {
    this.cart$.next(cart);
  }

  clear() {
    this.cart$.next(null);
  }
}
