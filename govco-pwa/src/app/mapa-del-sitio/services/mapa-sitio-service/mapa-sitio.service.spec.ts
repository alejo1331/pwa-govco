import { TestBed } from '@angular/core/testing';

import { MapaSitioService } from './mapa-sitio.service';

describe('MapaSitioService', () => {
  let service: MapaSitioService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(MapaSitioService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
