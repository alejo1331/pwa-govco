import { TestBed } from '@angular/core/testing';

import { DesplegableDosService } from './desplegable-dos.service';

describe('DesplegableDosService', () => {
  let service: DesplegableDosService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(DesplegableDosService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
