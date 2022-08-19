import { TestBed } from '@angular/core/testing';

import { ValidarUrlServiceService } from './validar-url-service.service';

describe('ValidarUrlServiceService', () => {
  let service: ValidarUrlServiceService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ValidarUrlServiceService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
