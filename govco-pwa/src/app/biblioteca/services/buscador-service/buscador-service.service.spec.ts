import { TestBed } from '@angular/core/testing';

import { BuscadorServiceService } from './buscador-service.service';

describe('BuscadorServiceService', () => {
  let service: BuscadorServiceService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(BuscadorServiceService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
