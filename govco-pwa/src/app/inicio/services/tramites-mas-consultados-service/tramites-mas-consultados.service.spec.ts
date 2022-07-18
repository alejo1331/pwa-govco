import { TestBed } from '@angular/core/testing';

import { TramitesMasConsultadosService } from './tramites-mas-consultados.service';

describe('TramitesMasConsultadosService', () => {
  let service: TramitesMasConsultadosService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(TramitesMasConsultadosService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
