import { TestBed } from '@angular/core/testing';

import { FiltrosTramitesService } from './filtros-tramites.service';

describe('FiltrosTramitesService', () => {
  let service: FiltrosTramitesService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(FiltrosTramitesService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
