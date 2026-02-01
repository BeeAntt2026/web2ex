import { TestBed } from '@angular/core/testing';
import { Fakeproductservice } from './fakeproductservices';


describe('Fakeproductservice', () => {
  let service: Fakeproductservice;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(Fakeproductservice);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
