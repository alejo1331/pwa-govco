import { HttpClientTestingModule } from '@angular/common/http/testing';
import { TestBed } from '@angular/core/testing';

import { FiltrosService } from './filtros.service';

describe('FiltrosService', () => {
  let service: FiltrosService;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [HttpClientTestingModule]
    });
    service = TestBed.inject(FiltrosService);
  });

  it('Debe de crearse correctamente', () => {
    expect(service).toBeTruthy();
  });
});
