/* tslint:disable:no-unused-variable */

import { TestBed, async, inject } from '@angular/core/testing';
import { OidcService } from './oidc.service';

describe('Service: Oidc', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [OidcService]
    });
  });

  it('should ...', inject([OidcService], (service: OidcService) => {
    expect(service).toBeTruthy();
  }));
});
