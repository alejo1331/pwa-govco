import { TestBed } from '@angular/core/testing';

import { TituloServiceService } from './titulo-service.service';

describe('TituloServiceService', () => {
  let service: TituloServiceService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(TituloServiceService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
