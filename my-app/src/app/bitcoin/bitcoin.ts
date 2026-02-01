import { Component, OnInit } from '@angular/core';
import { ICryptoCurrency } from '../myclasses/bitcoinprice';
import { BitcoinService } from '../myservices/bitcoin';

@Component({
  selector: 'app-bitcoin',
  standalone: false,
  templateUrl: './bitcoin.html',
  styleUrl: './bitcoin.css',
})
export class Bitcoin implements OnInit {
  cryptoData: ICryptoCurrency[] = [];
  bitcoinData: ICryptoCurrency | null = null;
  errMessage: string = '';
  isLoading: boolean = false;

  constructor(private _service: BitcoinService) { }

  ngOnInit(): void {
    this.loadData();
  }

  loadData(): void {
    this.isLoading = true;
    this.errMessage = '';
    console.log('🚀 Starting to load crypto data...');
    
    this._service.getCryptoData().subscribe({
      next: (data) => { 
        console.log('✅ Data received:', data);
        this.cryptoData = data;
        this.bitcoinData = data.find(coin => coin.id === 'bitcoin') || null;
        this.isLoading = false;
        console.log('📊 Bitcoin data:', this.bitcoinData);
      },
      error: (err) => {
        console.error('❌ Error loading data:', err);
        this.errMessage = err.message;
        this.isLoading = false;
      }
    });
  }

  formatPrice(price: string): string {
    return parseFloat(price).toLocaleString('en-US', { 
      style: 'currency', 
      currency: 'USD' 
    });
  }

  formatNumber(num: string): string {
    return parseFloat(num).toLocaleString('en-US');
  }

  getChangeClass(change: string): string {
    const value = parseFloat(change);
    return value >= 0 ? 'text-success' : 'text-danger';
  }
}
