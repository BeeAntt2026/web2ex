import { HttpClient, HttpErrorResponse, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, throwError } from 'rxjs';
import { map, retry, catchError } from 'rxjs/operators';
import { Fashion } from '../myclasses/Fashion';

@Injectable({
  providedIn: 'root',
})
export class FashionApiservice {
  constructor(private _http: HttpClient) { }

  // Header dùng cho GET, DELETE
  private getOptions(): Object {
    const headers = new HttpHeaders().set("Content-Type", "text/plain;charset=utf-8");
    return { headers: headers, responseType: "text" };
  }

  // Header dùng cho POST, PUT
  private postOptions(): Object {
    const headers = new HttpHeaders().set("Content-Type", "application/json;charset=utf-8");
    return { headers: headers, responseType: "text" };
  }

  // GET tất cả Fashion (sort ngày tạo mới nhất)
  getFashions(): Observable<any> {
    return this._http.get<any>("/fashions", this.getOptions()).pipe(
      map(res => JSON.parse(res) as Array<Fashion>),
      retry(3),
      catchError(this.handleError)
    );
  }

  // GET Fashion theo Style
  getFashionsByStyle(style: string): Observable<any> {
    return this._http.get<any>("/fashions/style/" + style, this.getOptions()).pipe(
      map(res => JSON.parse(res) as Array<Fashion>),
      retry(3),
      catchError(this.handleError)
    );
  }

  // GET 1 Fashion theo id
  getFashion(id: string): Observable<any> {
    return this._http.get<any>("/fashions/" + id, this.getOptions()).pipe(
      map(res => JSON.parse(res) as Fashion),
      retry(3),
      catchError(this.handleError)
    );
  }

  // POST thêm mới Fashion
  postFashion(aFashion: any): Observable<any> {
    return this._http.post<any>("/fashions", JSON.stringify(aFashion), this.postOptions()).pipe(
      map(res => JSON.parse(res) as Fashion),
      retry(3),
      catchError(this.handleError)
    );
  }

  // PUT cập nhật Fashion
  putFashion(aFashion: any): Observable<any> {
    return this._http.put<any>("/fashions", JSON.stringify(aFashion), this.postOptions()).pipe(
      map(res => JSON.parse(res) as Fashion),
      retry(3),
      catchError(this.handleError)
    );
  }

  // DELETE xóa Fashion
  deleteFashion(id: string): Observable<any> {
    return this._http.delete<any>("/fashions/" + id, this.getOptions()).pipe(
      map(res => JSON.parse(res) as Fashion),
      retry(3),
      catchError(this.handleError)
    );
  }

  handleError(error: HttpErrorResponse) {
    return throwError(() => new Error(error.message));
  }
}
