import { TestBed } from '@angular/core/testing';

import { GeolocalizacionViewService } from './geolocalizacion-view.service';

describe('GeolocalizacionViewService', () => {
  let service: GeolocalizacionViewService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(GeolocalizacionViewService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
