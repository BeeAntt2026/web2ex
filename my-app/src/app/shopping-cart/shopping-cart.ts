import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';
import { Observable } from 'rxjs';
import { CartItem } from '../myclasses/product';
import { CartApiService } from '../myservices/cart-api-service';

@Component({
  selector: 'app-shopping-cart',
  standalone: false,
  templateUrl: './shopping-cart.html',
  styleUrl: './shopping-cart.css',
})
export class ShoppingCart implements OnInit {
  cartItems: CartItem[] = [];
  msg: string = '';

  constructor(private cartSv: CartApiService, private router: Router) {}

  ngOnInit(): void {
    this.loadCart();
  }

  loadCart(): void {
    this.cartSv.getCart().subscribe({
      next: items => {
        // Thêm checked = false cho mỗi item (chỉ dùng ở frontend)
        this.cartItems = items.map(i => ({ ...i, checked: false }));
      },
      error: err => console.error('Lỗi tải giỏ:', err)
    });
  }

  lineTotal(item: CartItem): number {
    return (item.price || 0) * (item.quantity || 1);
  }

  cartTotal(): number {
    return this.cartItems.reduce((sum, i) => sum + this.lineTotal(i), 0);
  }

  // "Update shopping cart":
  // 1. Xóa các item được check khỏi session
  // 2. Cập nhật số lượng các item còn lại
  updateCart(): void {
    const checkedItems = this.cartItems.filter(i => i.checked);
    const remainItems  = this.cartItems.filter(i => !i.checked);

    // Hàm cập nhật số lượng sau khi xóa xong
    const doUpdate = () => {
      const updates = remainItems.map(i => ({
        productId: i.productId,
        quantity: i.quantity
      }));
      this.cartSv.updateCart(updates).subscribe({
        next: () => {
          this.msg = '✅ Giỏ hàng đã được cập nhật!';
          this.loadCart();
          setTimeout(() => this.msg = '', 2500);
        }
      });
    };

    // Xóa tuần tự từng item được check
    if (checkedItems.length > 0) {
      let count = 0;
      checkedItems.forEach(item => {
        this.cartSv.removeItem(item.productId).subscribe(() => {
          count++;
          if (count === checkedItems.length) doUpdate();
        });
      });
    } else {
      doUpdate();
    }
  }

  // "Continue shopping" → quay về trang sản phẩm
  continueShopping(): void {
    this.router.navigate(['/product-list']);
  }
}
