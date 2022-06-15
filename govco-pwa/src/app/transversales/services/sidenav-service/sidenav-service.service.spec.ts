/* tslint:disable:no-unused-variable */

import { TestBed, async, inject } from '@angular/core/testing';
import { SidenavServiceService } from './sidenav-service.service';

describe('Service: SidenavService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [SidenavServiceService]
    });
  });

  it('should ...', inject([SidenavServiceService], (service: SidenavServiceService) => {
    expect(service).toBeTruthy();
  }));
});
