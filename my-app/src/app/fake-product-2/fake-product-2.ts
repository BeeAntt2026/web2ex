import { Component } from '@angular/core';
import { Fakeproductservice } from '../myservices/fakeproductservices';

@Component({
  selector: 'app-fake-product-2',
  standalone: false,
  templateUrl: './fake-product-2.html',
  styleUrl: './fake-product-2.css',
})
export class FakeProduct2 {
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
