import { CartProduct } from './cart.model';

export interface OrderItem {
  productId: number;
  title: string;
  price: number;
  quantity: number;
}

export type OrderStatus = 'pending' | 'awaiting_payment' | 'paid' | 'completed' | 'cancelled';

export interface Order {
  id: number;
  totalPrice: number;
  status: OrderStatus;
  createdAt: Date;
  products: CartProduct[];
}


