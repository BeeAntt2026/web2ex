import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FashionForm } from './fashion-form';

describe('FashionForm', () => {
  let component: FashionForm;
  let fixture: ComponentFixture<FashionForm>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [FashionForm],
    }).compileComponents();

    fixture = TestBed.createComponent(FashionForm);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
