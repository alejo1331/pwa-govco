import { TestBed } from '@angular/core/testing';

import { ContactoEmergenciaService } from './contacto-emergencia.service';

describe('ContactoEmergenciaService', () => {
  let service: ContactoEmergenciaService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ContactoEmergenciaService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
