import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable, of } from 'rxjs';
import { delay, map } from 'rxjs/operators';
import { Payment, PaymentStatus } from '../models/payment.model';

const STORAGE_KEY = 'payments';

@Injectable({ providedIn: 'root' })
export class PaymentService {
    private payments$ = new BehaviorSubject<Payment[]>([]);

    constructor() {
        const data = localStorage.getItem(STORAGE_KEY);
        if (data) {
            this.payments$.next(JSON.parse(data));
        }
    }

    getAll(): Observable<Payment[]> {
        return this.payments$.asObservable();
    }

    getById(id: number): Observable<Payment | undefined> {
        return this.payments$.pipe(
            map(payments => payments.find(p => p.id === id))
        );
    }

    getByOrderId(orderId: number): Observable<Payment | undefined> {
        return this.payments$.pipe(
            map(payments => payments.find(p => p.orderId === orderId))
        );
    }

    processPayment(payment: Omit<Payment, 'id' | 'createdAt' | 'completedAt'>): Observable<Payment> {
        return of(null).pipe(
            delay(1500), 
            map(() => {
                const newPayment: Payment = {
                    ...payment,
                    id: Date.now(),
                    createdAt: new Date(),
                    status: 'completed' as PaymentStatus,
                    completedAt: new Date()
                };
                this.addPayment(newPayment);
                return newPayment;
            })
        );
    }

    private addPayment(payment: Payment): void {
        const current = this.payments$.value;
        const updated = [...current, payment];
        this.payments$.next(updated);
        localStorage.setItem(STORAGE_KEY, JSON.stringify(updated));
    }
}
