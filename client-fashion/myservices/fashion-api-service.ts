import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { Fashion } from '../myclasses/Fashion';

@Injectable({
  providedIn: 'root',
})
export class FashionApiService {
  private apiUrl = '/fashions';

  constructor(private _http: HttpClient) { }

  // GET tất cả Fashion (sort ngày tạo mới nhất)
  getFashions(): Observable<Fashion[]> {
    return this._http.get<Fashion[]>(this.apiUrl).pipe(
      catchError(this.handleError)
    );
  }

  // GET Fashion theo Style
  getFashionsByStyle(style: string): Observable<Fashion[]> {
    return this._http.get<Fashion[]>(`${this.apiUrl}/style/${style}`).pipe(
      catchError(this.handleError)
    );
  }

  // GET 1 Fashion theo id
  getFashion(id: string): Observable<Fashion> {
    return this._http.get<Fashion>(`${this.apiUrl}/${id}`).pipe(
      catchError(this.handleError)
    );
  }

  // POST thêm mới Fashion
  postFashion(aFashion: Fashion): Observable<Fashion> {
    return this._http.post<Fashion>(this.apiUrl, aFashion).pipe(
      catchError(this.handleError)
    );
  }

  // PUT cập nhật Fashion
  putFashion(aFashion: Fashion): Observable<Fashion> {
    return this._http.put<Fashion>(this.apiUrl, aFashion).pipe(
      catchError(this.handleError)
    );
  }

  // DELETE xóa Fashion
  deleteFashion(id: string): Observable<Fashion> {
    return this._http.delete<Fashion>(`${this.apiUrl}/${id}`).pipe(
      catchError(this.handleError)
    );
  }

  private handleError(error: HttpErrorResponse) {
    let errorMessage = 'Có lỗi xảy ra!';
    if (error.error instanceof ErrorEvent) {
      // Lỗi client-side
      errorMessage = `Lỗi: ${error.error.message}`;
    } else {
      // Lỗi server-side
      errorMessage = `Mã lỗi: ${error.status}\nThông báo: ${error.message}`;
    }
    console.error(errorMessage);
    return throwError(() => new Error(errorMessage));
  }
}
