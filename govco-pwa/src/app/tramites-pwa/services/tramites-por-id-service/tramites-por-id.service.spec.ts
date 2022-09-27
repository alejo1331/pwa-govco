import { TestBed } from '@angular/core/testing';

import { TramitesPorIdService } from './tramites-por-id.service';

describe('TramitesPorIdService', () => {
  let service: TramitesPorIdService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(TramitesPorIdService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
