import { TestBed } from '@angular/core/testing';

import { HeaderBibliotecaService } from './header-biblioteca-service.service';

describe('HeaderServiceService', () => {
  let service: HeaderBibliotecaService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(HeaderBibliotecaService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
