import { TestBed } from '@angular/core/testing';

import { TramitesMasConsultadosService } from './tramites-mas-consultados.service';

describe('TramitesMasConsultadosService', () => {
  let service: TramitesMasConsultadosService;
  let httpClientSpy: { get: jasmine.Spy }


  beforeEach(() => {
    TestBed.configureTestingModule({});
    httpClientSpy = jasmine.createSpyObj('HttpClient', ['get'])
    service = new TramitesMasConsultadosService(httpClientSpy as any)
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
