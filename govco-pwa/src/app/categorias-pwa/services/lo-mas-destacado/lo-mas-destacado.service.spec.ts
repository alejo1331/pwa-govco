/* tslint:disable:no-unused-variable */

import { TestBed, async, inject } from '@angular/core/testing';
import { LoMasDestacadoService } from './lo-mas-destacado.service';

describe('Service: LoMasDestacado', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [LoMasDestacadoService]
    });
  });

  it('should ...', inject([LoMasDestacadoService], (service: LoMasDestacadoService) => {
    expect(service).toBeTruthy();
  }));
});
