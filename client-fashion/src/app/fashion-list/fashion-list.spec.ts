import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FashionList } from './fashion-list';

describe('FashionList', () => {
  let component: FashionList;
  let fixture: ComponentFixture<FashionList>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [FashionList],
    }).compileComponents();

    fixture = TestBed.createComponent(FashionList);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
