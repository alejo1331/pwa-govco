import { TestBed } from '@angular/core/testing';

import { GeneralIterceptorService } from './general-iterceptor.service';

describe('GeneralIterceptorService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: GeneralIterceptorService = TestBed.get(GeneralIterceptorService);
    expect(service).toBeTruthy();
  });
});
