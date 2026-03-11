import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FashionDetail } from './fashion-detail';

describe('FashionDetail', () => {
  let component: FashionDetail;
  let fixture: ComponentFixture<FashionDetail>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [FashionDetail],
    }).compileComponents();

    fixture = TestBed.createComponent(FashionDetail);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
