import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { FashionApiservice } from '../myservices/fashion-apiservice';

@Component({
  selector: 'app-fashion',
  standalone: false,
  templateUrl: './fashion.html',
  styleUrl: './fashion.css',
})
export class Fashion implements OnInit {
  fashions: any[] = [];
  errMessage: string = '';
  cartMessage: string = '';

  constructor(public _service: FashionApiservice, private _http: HttpClient) {}

  ngOnInit(): void {
    this._service.getFashions().subscribe({
      next: (data) => { this.fashions = data; },
      error: (err) => { this.errMessage = err; }
    });
  }

  addToCart(fashion: any): void {
    const product = {
      productId: fashion._id,
      name: fashion.fashion_subject,
      price: fashion.fashion_price || 0,
      image: fashion.fashion_image,
      quantity: 1
    };
    this._http.post<any>('/add-to-cart', product).subscribe({
      next: (res) => {
        this.cartMessage = res.message;
        setTimeout(() => this.cartMessage = '', 2000);
      },
      error: (err) => { this.cartMessage = 'Error adding to cart'; }
    });
  }
}
