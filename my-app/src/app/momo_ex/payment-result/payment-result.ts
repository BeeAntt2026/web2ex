import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';

interface TransactionInfo {
  orderId: string | null;
  requestId: string | null;
  amount: string | null;
  orderInfo: string | null;
  transId: string | null;
  resultCode: string | null;
  message: string | null;
  responseTime: string | null;
  payType: string | null;
}

@Component({
  selector: 'app-payment-result',
  standalone: false,
  templateUrl: './payment-result.html',
  styleUrl: './payment-result.css',
})
export class PaymentResult implements OnInit {
  transaction: TransactionInfo = {
    orderId: null,
    requestId: null,
    amount: null,
    orderInfo: null,
    transId: null,
    resultCode: null,
    message: null,
    responseTime: null,
    payType: null
  };
  
  isSuccess: boolean = false;
  hasParams: boolean = false;
  currentTime: Date = new Date();

  constructor(private route: ActivatedRoute, private router: Router) { }

  ngOnInit(): void {
    this.route.queryParams.subscribe(params => {
      // Map MoMo response params
      this.transaction = {
        orderId: params['orderId'] || null,
        requestId: params['requestId'] || null,
        amount: params['amount'] || null,
        orderInfo: params['orderInfo'] || null,
        transId: params['transId'] || null,
        resultCode: params['resultCode'] || null,
        message: params['message'] || null,
        responseTime: params['responseTime'] || null,
        payType: params['payType'] || null
      };

      // Check if we have MoMo params
      this.hasParams = !!(this.transaction.resultCode || this.transaction.orderId);

      // resultCode '0' means success in MoMo API
      this.isSuccess = this.transaction.resultCode === '0';
    });
  }

  getStatusMessage(): string {
    if (!this.hasParams) return '';
    
    const code = this.transaction.resultCode;
    const messages: { [key: string]: string } = {
      '0': 'Giao dịch thành công',
      '9000': 'Giao dịch đã được xác nhận thành công',
      '8000': 'Giao dịch đang được xử lý',
      '7000': 'Giao dịch đang được trừ tiền',
      '1001': 'Giao dịch thanh toán thất bại do tài khoản không đủ tiền',
      '1002': 'Giao dịch bị từ chối bởi nhà phát hành tài khoản thanh toán',
      '1003': 'Giao dịch bị hủy',
      '1004': 'Số tiền thanh toán vượt quá hạn mức thanh toán',
      '1005': 'URL hoặc QR code đã hết hạn',
      '1006': 'Người dùng đã từ chối xác nhận thanh toán',
      '1007': 'Tài khoản không tồn tại hoặc đang bị khóa',
      '1017': 'Giao dịch bị hủy bởi người dùng',
      '1026': 'Giao dịch bị giới hạn theo quy định',
      '4001': 'Giao dịch bị hạn chế theo quy định AML',
      '4100': 'Giao dịch thất bại do người dùng không đăng nhập'
    };
    
    return messages[code || ''] || this.transaction.message || 'Không xác định';
  }

  getPayTypeLabel(): string {
    const types: { [key: string]: string } = {
      'qr': 'QR Code',
      'webApp': 'Ứng dụng Web',
      'credit': 'Thẻ tín dụng',
      'napas': 'Thẻ ATM nội địa'
    };
    return types[this.transaction.payType || ''] || this.transaction.payType || 'Ví MoMo';
  }

  formatResponseTime(): string {
    if (!this.transaction.responseTime) return '';
    try {
      const timestamp = parseInt(this.transaction.responseTime);
      return new Date(timestamp).toLocaleString('vi-VN');
    } catch {
      return this.transaction.responseTime;
    }
  }

  goBackToHome(): void {
    this.router.navigate(['/']);
  }

  goToPayment(): void {
    this.router.navigate(['/momo-payment']);
  }

  printReceipt(): void {
    window.print();
  }
}
