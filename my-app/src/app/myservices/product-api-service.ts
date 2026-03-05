import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Product } from '../myclasses/product';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class ProductApiService {
  private API = 'http://localhost:3002/products';

  constructor(private http: HttpClient) {}

  // GET /products
  getAll(): Observable<Product[]> {
    return this.http.get<Product[]>(this.API);
  }

  // GET /products/:id
  getById(id: string): Observable<Product> {
    return this.http.get<Product>(`${this.API}/${id}`);
  }

  // POST /products/seed — gọi 1 lần để tạo dữ liệu mẫu
  seedData(): Observable<any> {
    return this.http.post(`${this.API}/seed`, {});
  }
}
