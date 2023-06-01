import { TestBed } from '@angular/core/testing';

import { LoMasConsultadoService } from './lo-mas-consultado.service';

describe('LoMasConsultadoService', () => {
  let service: LoMasConsultadoService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(LoMasConsultadoService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
