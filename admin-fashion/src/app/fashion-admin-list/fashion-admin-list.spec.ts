import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FashionAdminList } from './fashion-admin-list';

describe('FashionAdminList', () => {
  let component: FashionAdminList;
  let fixture: ComponentFixture<FashionAdminList>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [FashionAdminList],
    }).compileComponents();

    fixture = TestBed.createComponent(FashionAdminList);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
