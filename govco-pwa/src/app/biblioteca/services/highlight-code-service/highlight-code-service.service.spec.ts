import { TestBed } from '@angular/core/testing';

import { HighlightCodeServiceService } from './highlight-code-service.service';

describe('HighlightCodeServiceService', () => {
  let service: HighlightCodeServiceService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(HighlightCodeServiceService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
