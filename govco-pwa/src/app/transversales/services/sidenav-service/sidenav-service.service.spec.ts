/* tslint:disable:no-unused-variable */

import { TestBed, async, inject } from '@angular/core/testing';
import { SidenavService } from './sidenav-service.service';

describe('Service: SidenavService', () => {
  let service: SidenavService;
  let httpClientSpy: { get: jasmine.Spy }

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [SidenavService]
    });
    httpClientSpy = jasmine.createSpyObj('HttpClient', ['get'])
    service = new SidenavService()
  });
  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  // it('should ...', inject([SidenavService], (service: SidenavService) => {
  //   expect(service).toBeTruthy();
  // }));
});
