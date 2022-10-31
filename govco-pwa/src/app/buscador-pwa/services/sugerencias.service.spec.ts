/* tslint:disable:no-unused-variable */

import { TestBed, async, inject } from '@angular/core/testing';
import { SugerenciasService } from './sugerencias.service';

describe('Service: Sugerencias', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [SugerenciasService]
    });
  });

  it('should ...', inject([SugerenciasService], (service: SugerenciasService) => {
    expect(service).toBeTruthy();
  }));
});
