import { HttpClient } from '@angular/common/http';
import { Component } from '@angular/core';
import { ProductApiService } from '../myservices/product-api-service';
import { Product } from '../myclasses/product';
import { Router } from '@angular/router';
import { CartApiService } from '../myservices/cart-api-service';

@Component({
  selector: 'app-product-list',
  standalone: false,
  templateUrl: './product-list.html',
  styleUrl: './product-list.css',
})
export class ProductList {
  products: Product[] = [];
  toastMsg: string = '';

  constructor(
    private productSv: ProductApiService,
    private cartSv: CartApiService,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.productSv.getAll().subscribe({
      next: data => this.products = data,
      error: err => console.error('Lỗi tải sản phẩm:', err)
    });
  }

  addToCart(product: Product): void {
    // Backend /add-to-cart nhận: productId, name, price, image
    this.cartSv.addToCart({
      productId: product._id,
      name: product.name,
      price: product.price,
      image: product.image
    }).subscribe({
      next: () => {
        this.toastMsg = `✅ Đã thêm "${product.name}" vào giỏ!`;
        setTimeout(() => this.toastMsg = '', 2500);
      },
      error: err => console.error('Lỗi thêm giỏ:', err)
    });
  }

  goToCart(): void {
    this.router.navigate(['/shopping-cart']);
  }
}
