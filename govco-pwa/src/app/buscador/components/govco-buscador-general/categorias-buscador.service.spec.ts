/* tslint:disable:no-unused-variable */

import { TestBed, async, inject } from '@angular/core/testing';
import { CategoriasBuscadorService } from './categorias-buscador.service';

describe('Service: CategoriasBuscador', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [CategoriasBuscadorService]
    });
  });

  it('should ...', inject([CategoriasBuscadorService], (service: CategoriasBuscadorService) => {
    expect(service).toBeTruthy();
  }));
});
