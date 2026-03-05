import { HttpClient, HttpErrorResponse, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, throwError } from 'rxjs';
import { map, retry, catchError } from 'rxjs/operators';
import { Fashion } from '../myclasses/Fashion';

@Injectable({
  providedIn: 'root',
})
export class FashionApiservice {
  private apiUrl = "http://localhost:3002";
  constructor(private _http: HttpClient) { }
getFashions():Observable<any>
{
const headers=new HttpHeaders().set("Content-Type","text/plain;charset=utf-8")
const requestOptions:Object={
headers:headers,
responseType:"text"
}
return this._http.get<any>(this.apiUrl + "/fashions",requestOptions).pipe(
map(res=>JSON.parse(res) as Array<Fashion>),
retry(3),
catchError(this.handleError))
}
getFashion(id: string): Observable<any> {
  const headers = new HttpHeaders().set("Content-Type", "text/plain;charset=utf-8");
  const requestOptions: Object = {
    headers: headers,
    responseType: "text"
  };
  return this._http.get<any>(this.apiUrl + "/fashions/" + id, requestOptions).pipe(
    map(res => JSON.parse(res) as Fashion),
    retry(3),
    catchError(this.handleError)
  );
}
handleError(error:HttpErrorResponse){
return throwError(()=>new Error(error.message))
}
}
