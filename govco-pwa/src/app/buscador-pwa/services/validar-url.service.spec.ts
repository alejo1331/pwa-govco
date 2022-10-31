import { TestBed } from '@angular/core/testing';

import { ValidarUrlService } from './validar-url.service';

describe('ValidarUrlService', () => {
  let service: ValidarUrlService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ValidarUrlService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
