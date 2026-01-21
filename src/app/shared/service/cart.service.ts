import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Cart } from '../models/cart.model';

const DUMMY_HTTP = 'https://dummyjson.com/carts';

@Injectable({ providedIn: 'root' })
export class CartService {

  constructor(private http: HttpClient) {}

  addToCart(
    userId: number,
    productId: number,
    quantity: number = 1
  ): Observable<Cart> {
    return this.http.post<Cart>(`${DUMMY_HTTP}/add`, {
      userId,
      products: [{ id: productId, quantity }]
    });
  }

  getCart(cartId: number): Observable<Cart> {
    return this.http.get<Cart>(`${DUMMY_HTTP}/${cartId}`);
  }
}
