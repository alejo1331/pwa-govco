import { TestBed } from '@angular/core/testing';

import { ActualidadPrincipalService } from './actualidad-principal.service';

describe('ActualidadPrincipalService', () => {
  let service: ActualidadPrincipalService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ActualidadPrincipalService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
