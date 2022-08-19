import { TestBed } from '@angular/core/testing';

import { RecursosServiceService } from './recursos-service.service';

describe('RecursosServiceService', () => {
  let service: RecursosServiceService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(RecursosServiceService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
