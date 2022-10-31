/* tslint:disable:no-unused-variable */

import { TestBed, async, inject } from '@angular/core/testing';
import { BuscadorService } from './buscador.service';

describe('Service: Buscador', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [BuscadorService]
    });
  });

  it('should ...', inject([BuscadorService], (service: BuscadorService) => {
    expect(service).toBeTruthy();
  }));
});
