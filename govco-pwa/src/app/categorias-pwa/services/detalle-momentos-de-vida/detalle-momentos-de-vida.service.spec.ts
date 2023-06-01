import { TestBed } from '@angular/core/testing';

import { DetalleMomentosDeVidaService } from './detalle-momentos-de-vida.service';

describe('DetalleMomentosDeVidaService', () => {
  let service: DetalleMomentosDeVidaService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(DetalleMomentosDeVidaService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
