import { TestBed } from '@angular/core/testing';

import { BannerInternasService } from './banner-internas.service';

describe('BannerInternasService', () => {
  let service: BannerInternasService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(BannerInternasService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
