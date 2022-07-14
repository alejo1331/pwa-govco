import { TestBed } from '@angular/core/testing';

import { EntidadesServiceService } from './entidades-service.service';

describe('EntidadesServiceService', () => {
  let service: EntidadesServiceService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(EntidadesServiceService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
