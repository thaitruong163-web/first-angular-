import { Component, Input, Output, EventEmitter } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { ToastrService } from 'ngx-toastr';
import { PaymentState } from '../../../../shared/state/payment.state';
import { Payment, PaymentMethod } from '../../../../shared/models/payment.model';

@Component({
    standalone: true,
    selector: 'app-payment',
    imports: [CommonModule, FormsModule],
    templateUrl: './payment.component.html',
    styleUrls: ['./payment.component.scss']
})
export class PaymentComponent {
    @Input() orderId!: number;
    @Input() amount!: number;
    @Output() paymentSuccess = new EventEmitter<Payment>();
    @Output() paymentCancel = new EventEmitter<void>();

    paymentMethod: PaymentMethod = 'credit-card';
    cardNumber = '';
    cardHolder = '';
    expiryDate = '';
    cvv = '';
    loading = false;
    error = '';

    paymentMethods: PaymentMethod[] = ['credit-card', 'debit-card', 'bank-transfer', 'e-wallet'];

    constructor(
        private paymentState: PaymentState,
        private toastr: ToastrService
    ) { }

    processPayment(): void {
        if (!this.validateForm()) return;

        const payment: Omit<Payment, 'id' | 'createdAt' | 'completedAt'> = {
            orderId: this.orderId,
            amount: this.amount,
            method: this.paymentMethod,
            status: 'processing',
            cardNumber: this.maskCardNumber(this.cardNumber),
            cardHolder: this.cardHolder,
            expiryDate: this.expiryDate,
            cvv: undefined
        };

        this.paymentState.processPayment(payment).subscribe({
            next: (result) => {
                this.loading = false;
                this.toastr.success('Thanh toán thành công!');
                this.paymentSuccess.emit(result);
            },
            error: () => {
                this.loading = false;
                this.error = 'Thanh toán thất bại. Vui lòng thử lại.';
                this.toastr.error(this.error);
            }
        });
    }

    cancel(): void {
        this.paymentCancel.emit();
    }

    private validateForm(): boolean {
        if (this.paymentMethod === 'credit-card' || this.paymentMethod === 'debit-card') {
            if (!this.cardNumber || this.cardNumber.length < 13) {
                this.error = 'Số thẻ không hợp lệ';
                return false;
            }
            if (!this.cardHolder) {
                this.error = 'Tên chủ thẻ bắt buộc';
                return false;
            }
            if (!this.expiryDate) {
                this.error = 'Ngày hết hạn bắt buộc';
                return false;
            }
            if (!this.cvv || this.cvv.length < 3) {
                this.error = 'CVV không hợp lệ';
                return false;
            }
        }
        return true;
    }

    private maskCardNumber(cardNumber: string): string {
        const last4 = cardNumber.slice(-4);
        return '**** **** **** ' + last4;
    }
}
