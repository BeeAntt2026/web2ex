import { HttpClient, HttpErrorResponse, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/internal/Observable';
import { IBitcoinPrice } from '../myclasses/bitcoinprice';
import { catchError, map, retry, throwError } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class BitcoinService {
  // Alternative.me API endpoint (proxy)
  private _alternativeMeUrl: string = '/crypto';
  
  // Coindesk API endpoint (proxy - Exercise 28)
  private _coindeskUrl: string = '/v1/bpi/currentprice.json';
  
  constructor(private _http: HttpClient) { }
  
  /**
   * Exercise 28: Get Bitcoin Price Index from Coindesk API
   * Direct API call without proxy
   */
  getCoindeskBitcoinPrice(): Observable<IBitcoinPrice> {
    const headers = new HttpHeaders().set('Content-Type', 'application/json');
    const requestOptions: Object = {
      headers: headers,
      responseType: 'json'
    };
    return this._http.get<IBitcoinPrice>(this._coindeskUrl, requestOptions).pipe(
      retry(3),
      catchError(this.handleError)
    );
  }
  
  /**
   * Legacy method: Get Bitcoin data from Alternative.me API (via proxy)
   */
  getBitcoinPriceData(): Observable<IBitcoinPrice> {
    const headers = new HttpHeaders().set('Content-Type', 'application/json');
    const requestOptions: Object = {
      headers: headers,
      responseType: 'json'
    };
    return this._http.get<IBitcoinPrice>(this._alternativeMeUrl, requestOptions).pipe(
      retry(3),
      catchError(this.handleError)
    );
  }
  
  handleError(error: HttpErrorResponse): Observable<never> {
    console.error('Bitcoin API Error:', error);
    let errorMessage = 'Failed to load Bitcoin data';
    
    if (error.error instanceof ErrorEvent) {
      // Client-side error
      errorMessage = `Network error: ${error.error.message}`;
    } else {
      // Server-side error
      errorMessage = `Server error (${error.status}): ${error.message}`;
    }
    
    return throwError(() => new Error(errorMessage));
  }
}
