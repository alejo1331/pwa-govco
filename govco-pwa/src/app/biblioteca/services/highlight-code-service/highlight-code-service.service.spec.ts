import { TestBed } from '@angular/core/testing';

import { HighlightcodeService } from './highlight-code-service.service';

describe('HighlightcodeService', () => {
  let service: HighlightcodeService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(HighlightcodeService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
