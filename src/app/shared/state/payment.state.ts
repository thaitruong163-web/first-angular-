import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { tap } from 'rxjs/operators';
import { Payment } from '../models/payment.model';
import { PaymentService } from '../service/payment.service';

@Injectable({ providedIn: 'root' })
export class PaymentState {
  private payments$ = new BehaviorSubject<Payment[]>([]);
  private loading$ = new BehaviorSubject<boolean>(false);

  constructor(private paymentService: PaymentService) {
    this.loadPayments();
  }

  getPayments(): Observable<Payment[]> {
    return this.payments$.asObservable();
  }

  getLoading(): Observable<boolean> {
    return this.loading$.asObservable();
  }

  getByOrderId(orderId: number): Payment | undefined {
    return this.payments$.value.find(p => p.orderId === orderId);
  }

  loadPayments(): void {
    this.paymentService.getAll().subscribe(payments => {
      this.payments$.next(payments);
    });
  }

  processPayment(payment: Omit<Payment, 'id' | 'createdAt' | 'completedAt'>) {
    this.loading$.next(true);

    return this.paymentService.processPayment(payment).pipe(
      tap(newPayment => {
        this.payments$.next([...this.payments$.value, newPayment]);
        this.loading$.next(false);
      })
    );
  }
}
