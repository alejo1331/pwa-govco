import { TestBed } from '@angular/core/testing';

import { ContegoriasServiceService } from './contegorias-service.service';

describe('ContegoriasServiceService', () => {
  let service: ContegoriasServiceService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ContegoriasServiceService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
