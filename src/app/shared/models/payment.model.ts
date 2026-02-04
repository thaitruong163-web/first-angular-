export type PaymentMethod = 'credit-card' | 'debit-card' | 'bank-transfer' | 'e-wallet';
export type PaymentStatus = 'pending' | 'processing' | 'completed' | 'failed' | 'cancelled';

export interface Payment {
    id: number;
    orderId: number;
    amount: number;
    method: PaymentMethod;
    status: PaymentStatus;
    cardNumber?: string;
    cardHolder?: string;
    expiryDate?: string;
    cvv?: string;
    createdAt: Date;
    completedAt?: Date;
}
