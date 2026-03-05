import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { CartItem } from '../myclasses/product';

@Injectable({
  providedIn: 'root',
})
export class CartApiService {
  // Sử dụng relative URL để proxy xử lý
  private API = '';

  // withCredentials: true → BẮT BUỘC để cookie session được gửi kèm
  private opts = { withCredentials: true };

  constructor(private http: HttpClient) {}

  // GET /cart → lấy giỏ hàng từ Session
  getCart(): Observable<CartItem[]> {
    return this.http.get<CartItem[]>(`${this.API}/cart`, this.opts);
  }

  // POST /add-to-cart → thêm sản phẩm vào Session
  addToCart(product: { productId: string; name: string; price: number; image: string }): Observable<any> {
    return this.http.post(`${this.API}/add-to-cart`, { ...product, quantity: 1 }, this.opts);
  }

  // POST /update-cart → cập nhật số lượng (gửi toàn bộ cart mới)
  updateCart(cart: { productId: string; quantity: number }[]): Observable<any> {
    return this.http.post(`${this.API}/update-cart`, { cart }, this.opts);
  }

  // DELETE /remove-from-cart/:productId → xóa 1 sản phẩm
  removeItem(productId: string): Observable<any> {
    return this.http.delete(`${this.API}/remove-from-cart/${productId}`, this.opts);
  }

  // DELETE /clear-cart → xóa toàn bộ giỏ
  clearCart(): Observable<any> {
    return this.http.delete(`${this.API}/clear-cart`, this.opts);
  }
}
