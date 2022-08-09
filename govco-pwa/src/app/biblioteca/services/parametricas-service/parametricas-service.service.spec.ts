import { TestBed } from '@angular/core/testing';

import { ParametricasServiceService } from './parametricas-service.service';

describe('ParametricasServiceService', () => {
  let service: ParametricasServiceService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ParametricasServiceService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
