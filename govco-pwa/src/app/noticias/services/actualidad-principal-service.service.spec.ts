import { TestBed } from '@angular/core/testing';

import { ActualidadPrincipalServiceService } from './actualidad-principal-service.service';

describe('ActualidadPrincipalServiceService', () => {
  let service: ActualidadPrincipalServiceService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ActualidadPrincipalServiceService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
