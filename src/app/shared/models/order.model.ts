export interface OrderItem {
  productId: number;
  title: string;
  price: number;
  quantity: number;
}

export type OrderStatus = 'pending' | 'completed' | 'cancelled';

export interface Order {
  id: number;
  totalPrice: number;
  status: OrderStatus;
  createdAt: Date;
  items: OrderItem[];
}


