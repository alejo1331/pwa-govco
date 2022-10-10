import { TestBed } from '@angular/core/testing';

import { ValidateUrlService } from './validate-url.service';

describe('ValidateUrlService', () => {
  let service: ValidateUrlService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ValidateUrlService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
