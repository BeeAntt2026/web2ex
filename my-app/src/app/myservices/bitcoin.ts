import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { ICryptoCurrency } from '../myclasses/bitcoinprice';
import { catchError, map, retry, switchMap } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class BitcoinService {
  // Use proxy to call API (proxy forwards to https://api.alternative.me)
  private _url: string = '/v1/ticker/';
  
  constructor(private _http: HttpClient) { }
  
  /**
   * Get cryptocurrency data from Alternative.me API via proxy
   */
  getCryptoData(): Observable<ICryptoCurrency[]> {
    console.log('📡 Calling API via proxy:', this._url);
    return this._http.get<ICryptoCurrency[]>(this._url).pipe(
      map(res => {
        console.log('✅ API response received:', res);
        if (Array.isArray(res)) return res;
        return Object.values(res) as ICryptoCurrency[];
      }),
      catchError(err => {
        console.error('❌ API call failed:', err);
        return of([]);
      })
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
}
