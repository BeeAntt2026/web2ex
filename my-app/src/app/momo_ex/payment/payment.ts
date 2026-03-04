import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';

interface OrderInfo {
  orderId: string;
  orderInfo: string;
  amount: number;
  createdAt: Date;
}

@Component({
  selector: 'app-payment',
  standalone: false,
  templateUrl: './payment.html',
  styleUrl: './payment.css',
})
export class Payment implements OnInit {
  // Form fields
  amount: number = 50000;
  orderDescription: string = 'Thanh toán đơn hàng';
  
  // Quick amount options
  quickAmounts: number[] = [10000, 20000, 50000, 100000, 200000, 500000];
  
  // Validation
  minAmount: number = 1000;
  maxAmount: number = 50000000;
  
  // State
  loading: boolean = false;
  errorMsg: string = '';
  order: OrderInfo | null = null;
  step: 'input' | 'confirm' | 'processing' = 'input';

  constructor(private http: HttpClient) { }

  ngOnInit(): void {
    this.generateOrder();
  }

  generateOrder(): void {
    this.order = {
      orderId: 'MOMO' + Date.now() + Math.random().toString(36).substring(2, 7).toUpperCase(),
      orderInfo: this.orderDescription,
      amount: this.amount,
      createdAt: new Date()
    };
  }

  selectQuickAmount(amt: number): void {
    this.amount = amt;
    this.updateOrder();
  }

  updateOrder(): void {
    if (this.order) {
      this.order.amount = this.amount;
      this.order.orderInfo = this.orderDescription;
    }
  }

  validateAmount(): boolean {
    if (!this.amount || this.amount < this.minAmount) {
      this.errorMsg = `Số tiền tối thiểu là ${this.minAmount.toLocaleString()} VNĐ`;
      return false;
    }
    if (this.amount > this.maxAmount) {
      this.errorMsg = `Số tiền tối đa là ${this.maxAmount.toLocaleString()} VNĐ`;
      return false;
    }
    return true;
  }

  proceedToConfirm(): void {
    this.errorMsg = '';
    if (this.validateAmount()) {
      this.updateOrder();
      this.step = 'confirm';
    }
  }

  backToInput(): void {
    this.step = 'input';
    this.errorMsg = '';
  }

  payWithMoMo(): void {
    if (!this.validateAmount()) return;
    
    this.loading = true;
    this.step = 'processing';
    this.errorMsg = '';

    const payload = {
      amount: this.amount,
      orderId: this.order?.orderId,
      orderInfo: this.orderDescription
    };

    console.log('Sending payment request:', payload);

    // Gọi trực tiếp đến backend server
    this.http.post<any>('http://localhost:3000/payment/momo', payload).subscribe({
      next: (response) => {
        console.log('Payment response:', response);
        this.loading = false;
        if (response && response.payUrl) {
          // Redirect user to MoMo payment gateway
          console.log('Redirecting to:', response.payUrl);
          window.location.href = response.payUrl;
        } else if (response && response.success && response.payUrl) {
          window.location.href = response.payUrl;
        } else {
          this.step = 'confirm';
          this.errorMsg = response?.message || 'Không nhận được URL thanh toán từ server.';
          console.error('Invalid response from server:', response);
        }
      },
      error: (err) => {
        this.loading = false;
        this.step = 'confirm';
        this.errorMsg = 'Lỗi khi khởi tạo thanh toán. Vui lòng thử lại.';
        console.error('Payment error:', err);
      }
    });
  }

  cancelPayment(): void {
    this.step = 'input';
    this.loading = false;
    this.generateOrder();
  }
}
