import { TestBed } from '@angular/core/testing';

import { BookAPIservice } from './book-apiservice';

describe('BookAPIservice', () => {
  let service: BookAPIservice;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(BookAPIservice);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
