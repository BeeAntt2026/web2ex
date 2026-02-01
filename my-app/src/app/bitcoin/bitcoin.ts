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

  constructor(private _service: BitcoinService) { }

  ngOnInit(): void {
    this.loadData();
  }

  loadData(): void {
    this.errMessage = '';
    console.log('🚀 Starting to load crypto data...');
    
    this._service.getCryptoData().subscribe({
      next: (data) => { 
        console.log('✅ Data received:', data);
        this.cryptoData = data;
        this.bitcoinData = data.find(coin => coin.id === 'bitcoin') || null;
        console.log('📊 Bitcoin data:', this.bitcoinData);
        console.log('📊 Total coins:', this.cryptoData.length);
      },
      error: (err) => {
        console.error('❌ Error loading data:', err);
        this.errMessage = err.message;
        // Load mock data as fallback
        this.loadMockData();
      }
    });
  }

  // Fallback mock data if API fails
  loadMockData(): void {
    console.log('📦 Loading mock data as fallback...');
    this.cryptoData = [
      {
        id: 'bitcoin',
        name: 'Bitcoin',
        symbol: 'BTC',
        rank: '1',
        price_usd: '77291.00',
        price_btc: '1.00',
        '24h_volume_usd': '79880890968',
        market_cap_usd: '1544092184471',
        available_supply: '19982656',
        total_supply: '19982656',
        max_supply: '21000000',
        percent_change_1h: '-0.72',
        percent_change_24h: '-4.44',
        percent_change_7d: '-12.48',
        last_updated: '1769962481'
      },
      {
        id: 'ethereum',
        name: 'Ethereum',
        symbol: 'ETH',
        rank: '2',
        price_usd: '2305.50',
        price_btc: '0.0298',
        '24h_volume_usd': '51556264352',
        market_cap_usd: '278876205682',
        available_supply: '120693815',
        total_supply: '120693815',
        max_supply: '120693815',
        percent_change_1h: '-2.08',
        percent_change_24h: '-8.38',
        percent_change_7d: '-21.29',
        last_updated: '1769962483'
      },
      {
        id: 'tether',
        name: 'Tether',
        symbol: 'USDT',
        rank: '3',
        price_usd: '0.9990',
        price_btc: '0.000013',
        '24h_volume_usd': '140325897779',
        market_cap_usd: '185183089148',
        available_supply: '185373050611',
        total_supply: '185373050611',
        max_supply: '190839987688',
        percent_change_1h: '0.00',
        percent_change_24h: '0.04',
        percent_change_7d: '0.04',
        last_updated: '1769962481'
      }
    ];
    this.bitcoinData = this.cryptoData[0];
    this.errMessage = 'API không khả dụng - Đang hiển thị dữ liệu mẫu';
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
