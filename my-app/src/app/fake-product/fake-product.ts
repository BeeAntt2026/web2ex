import { Component, OnInit } from '@angular/core';
import { Fakeproductservice } from '../myservices/fakeproductservices';

@Component({
  selector: 'app-fake-product',
  standalone: false,
  templateUrl: './fake-product.html',
  styleUrl: './fake-product.css',
})
export class FakeProduct implements OnInit {
  data: any[] = [];
  errMessage: string = '';
  
  constructor(private service: Fakeproductservice) { }

  ngOnInit(): void {
    this.service.getFakeProductData().subscribe({
      next: (data) => { 
        this.data = data;
        console.log('Data loaded:', this.data);
      },
      error: (err) => {
        this.errMessage = err;
        console.error('Error:', err);
      }
    });
  }
}