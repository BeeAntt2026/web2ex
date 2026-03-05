import { TestBed } from '@angular/core/testing';

import { FashionApiservice } from './fashion-apiservice';

describe('FashionApiservice', () => {
  let service: FashionApiservice;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(FashionApiservice);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
