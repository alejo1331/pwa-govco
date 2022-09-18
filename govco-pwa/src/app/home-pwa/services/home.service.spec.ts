import { TestBed } from '@angular/core/testing';
import { HttpClientTestingModule } from '@angular/common/http/testing';

import { HomeService } from './home.service';

describe('HomeService', () => {
  let service: HomeService;
  let httpClientSpy: { get: jasmine.Spy };

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule]
    });
    httpClientSpy = jasmine.createSpyObj('HttpClient', ['get']);
    service = new HomeService(httpClientSpy as any);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
