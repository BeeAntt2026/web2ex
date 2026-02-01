import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/internal/Observable';
import { ICryptoCurrency } from '../myclasses/bitcoinprice';
import { catchError, map, retry, throwError } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class BitcoinService {
  // Direct API call - alternative.me has CORS enabled
  private _url: string = 'https://api.alternative.me/v1/ticker/';
  
  constructor(private _http: HttpClient) { }
  
  /**
   * Get cryptocurrency data from Alternative.me API
   * Returns array of cryptocurrencies
   */
  getCryptoData(): Observable<ICryptoCurrency[]> {
    console.log('📡 Calling API:', this._url);
    return this._http.get<ICryptoCurrency[]>(this._url).pipe(
      map(res => {
        console.log('📥 Response received:', res);
        // API returns an array directly
        if (Array.isArray(res)) {
          return res;
        }
        // If it's an object, convert to array
        return Object.values(res) as ICryptoCurrency[];
      }),
      retry(2),
      catchError(this.handleError)
    );
  }

  /**
   * Get Bitcoin data only
   */
  getBitcoinData(): Observable<ICryptoCurrency | undefined> {
    return this.getCryptoData().pipe(
      map(data => data.find(coin => coin.id === 'bitcoin'))
    );
  }
  
  handleError(error: HttpErrorResponse): Observable<never> {
    console.error('Crypto API Error:', error);
    let errorMessage = 'Failed to load cryptocurrency data';
    
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
