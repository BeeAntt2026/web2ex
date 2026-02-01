import { ComponentFixture, TestBed } from '@angular/core/testing';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { of, throwError } from 'rxjs';
import { vi, describe, it, expect, beforeEach } from 'vitest';
import { Bitcoin } from './bitcoin';
import { BitcoinService } from '../myservices/bitcoin';
import { IBitcoinPrice } from '../myclasses/bitcoinprice';

/**
 * Exercise 28: Bitcoin Component Tests
 * Proper testing with HTTP mocks - Best Practices
 */
describe('Bitcoin Component - Exercise 28', () => {
  let component: Bitcoin;
  let fixture: ComponentFixture<Bitcoin>;
  let service: BitcoinService;

  // Mock data
  const mockBitcoinData: IBitcoinPrice = {
    time: {
      updated: 'Feb 1, 2026 12:00:00 UTC',
      updatedISO: '2026-02-01T12:00:00+00:00',
      updateduk: 'Feb 1, 2026 at 12:00 GMT'
    },
    disclaimer: 'This data is for testing purposes',
    chartName: 'Bitcoin Price Index',
    bpi: {
      USD: {
        code: 'USD',
        symbol: '$',
        rate: '45,000.00',
        description: 'United States Dollar',
        rate_float: 45000
      },
      GBP: {
        code: 'GBP',
        symbol: '£',
        rate: '35,000.00',
        description: 'British Pound Sterling',
        rate_float: 35000
      },
      EUR: {
        code: 'EUR',
        symbol: '€',
        rate: '40,000.00',
        description: 'Euro',
        rate_float: 40000
      }
    }
  };

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [Bitcoin],
      imports: [HttpClientTestingModule],
      providers: [BitcoinService]
    }).compileComponents();

    fixture = TestBed.createComponent(Bitcoin);
    component = fixture.componentInstance;
    service = TestBed.inject(BitcoinService);
  });

  it('should create the component', () => {
    expect(component).toBeTruthy();
  });

  it('should load Bitcoin data on init', async () => {
    vi.spyOn(service, 'getCoindeskBitcoinPrice').mockReturnValue(of(mockBitcoinData));

    component.ngOnInit();

    await new Promise(resolve => setTimeout(resolve, 100));
    
    expect(component.bitcoinData).toEqual(mockBitcoinData);
    expect(component.isLoading).toBe(false);
    expect(component.errMessage).toBe('');
  });

  it('should handle errors properly', async () => {
    const errorMessage = 'Network error';
    vi.spyOn(service, 'getCoindeskBitcoinPrice').mockReturnValue(
      throwError(() => new Error(errorMessage))
    );

    component.loadData();

    await new Promise(resolve => setTimeout(resolve, 100));
    
    expect(component.errMessage).toBe(errorMessage);
    expect(component.isLoading).toBe(false);
    expect(component.bitcoinData).toBeNull();
  });

  it('should set loading state during data fetch', () => {
    vi.spyOn(service, 'getCoindeskBitcoinPrice').mockReturnValue(of(mockBitcoinData));
    
    component.loadData();
    
    expect(component.isLoading).toBe(true);
  });

  it('should cleanup subscriptions on destroy', () => {
    const nextSpy = vi.spyOn(component['destroy$'], 'next');
    const completeSpy = vi.spyOn(component['destroy$'], 'complete');

    component.ngOnDestroy();

    expect(nextSpy).toHaveBeenCalled();
    expect(completeSpy).toHaveBeenCalled();
  });

  it('should clear error message when reloading', () => {
    component.errMessage = 'Previous error';
    vi.spyOn(service, 'getCoindeskBitcoinPrice').mockReturnValue(of(mockBitcoinData));

    component.loadData();

    expect(component.errMessage).toBe('');
  });
});
