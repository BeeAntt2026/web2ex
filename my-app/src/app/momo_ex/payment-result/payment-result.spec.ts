import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PaymentResult } from './payment-result';

describe('PaymentResult', () => {
  let component: PaymentResult;
  let fixture: ComponentFixture<PaymentResult>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [PaymentResult]
    })
    .compileComponents();

    fixture = TestBed.createComponent(PaymentResult);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
