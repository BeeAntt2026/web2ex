import { TestBed } from '@angular/core/testing';

import { FashionApiService } from './fashion-api-service';

describe('FashionApiService', () => {
  let service: FashionApiService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(FashionApiService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
