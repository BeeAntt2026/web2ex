import { Component, OnInit, OnDestroy } from '@angular/core';
import { Subject, takeUntil } from 'rxjs';
import { IBitcoinPrice } from '../myclasses/bitcoinprice';
import { BitcoinService } from '../myservices/bitcoin';

/**
 * Exercise 28: Bitcoin Price Index Component
 * Displays real-time Bitcoin prices from Coindesk API
 * 
 * Best Practices Applied:
 * ✅ Memory leak protection (takeUntil pattern)
 * ✅ Proper type safety (no 'any')
 * ✅ Loading state management
 * ✅ Error handling
 * ✅ OnDestroy lifecycle for cleanup
 */
@Component({
  selector: 'app-bitcoin',
  standalone: false,
  templateUrl: './bitcoin.html',
  styleUrl: './bitcoin.css',
})
export class Bitcoin implements OnInit, OnDestroy {
  // State management
  bitcoinData: IBitcoinPrice | null = null;
  errMessage: string = '';
  isLoading: boolean = false;
  
  // Memory leak protection
  private destroy$ = new Subject<void>();

  constructor(private _service: BitcoinService) { }

  ngOnInit(): void {
    this.loadData();
  }

  /**
   * Load Bitcoin data from Coindesk API
   * Uses takeUntil to prevent memory leaks
   */
  loadData(): void {
    this.isLoading = true;
    this.errMessage = '';
    
    this._service.getCoindeskBitcoinPrice()
      .pipe(takeUntil(this.destroy$))  // ✅ Auto cleanup on component destroy
      .subscribe({
        next: (data: IBitcoinPrice) => {
          this.bitcoinData = data;
          this.isLoading = false;
          console.log('✅ Bitcoin data loaded:', data);
        },
        error: (err: Error) => {  // ✅ Proper type instead of 'any'
          this.errMessage = err.message;
          this.isLoading = false;
          console.error('❌ Error loading Bitcoin data:', err);
        }
      });
  }
  
  /**
   * Cleanup subscriptions on component destroy
   * Prevents memory leaks
   */
  ngOnDestroy(): void {
    this.destroy$.next();
    this.destroy$.complete();
    console.log('🧹 Bitcoin component destroyed - subscriptions cleaned up');
  }
}
