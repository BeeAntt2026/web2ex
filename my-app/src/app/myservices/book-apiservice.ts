import { HttpClient, HttpErrorResponse, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/internal/Observable';
import { throwError } from 'rxjs/internal/observable/throwError';
import { IBook } from '../myclasses/iBook';
import { map } from 'rxjs/internal/operators/map';
import { retry } from 'rxjs/internal/operators/retry';
import { catchError } from 'rxjs/internal/operators/catchError';


@Injectable({
  providedIn: 'root',
})
export class BookAPIservice {
  constructor(private _http: HttpClient) { }
  getBooks(): Observable<any>
  {
    const headers=new HttpHeaders().set("Content-Type","text/plain;charset=utf-8")
    const requestOptions:Object={
      headers:headers,
      responseType:"text"
    }
    return this._http.get<any>("http://localhost:3000/books",requestOptions).pipe(
      map(res=>JSON.parse(res) as Array<IBook>),
      retry(3),
      catchError(this.handleError))
    }
    handleError(error:HttpErrorResponse){
    return throwError(()=>new Error(error.message))
    }
  getBook (bookId:string):Observable<any>
  {
  const headers=new HttpHeaders().set("Content-Type","text/plain;charset=utf-8")
  const requestOptions:Object={
  headers:headers,
  responseType:"text"
  }
  return this._http.get<any>("http://localhost:3000/books/"+bookId,requestOptions).pipe(
  map(res=>JSON.parse(res) as IBook),
  retry(3),
  catchError(this.handleError))
  }
  // POST - Thêm sách mới
postBook(book: IBook): Observable<any> {
  return this._http.post<IBook>("http://localhost:3000/books", book, { headers: new HttpHeaders().set("Content-Type","application/json") })
    .pipe(catchError(this.handleError));
}

// PUT - Cập nhật sách
putBook(bookId: string, book: IBook): Observable<any> {
  return this._http.put<IBook>(`http://localhost:3000/books/${bookId}`, book, { headers: new HttpHeaders().set("Content-Type","application/json") })
    .pipe(catchError(this.handleError));
}

// DELETE - Xóa sách
deleteBook(bookId: string): Observable<any> {
  return this._http.delete(`http://localhost:3000/books/${bookId}`, { headers: new HttpHeaders().set("Content-Type","application/json") })
    .pipe(catchError(this.handleError));
}
}
