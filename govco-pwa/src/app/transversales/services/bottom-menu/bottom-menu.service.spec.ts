/* tslint:disable:no-unused-variable */

import { TestBed, async, inject } from '@angular/core/testing';
import { BottomMenuService } from './bottom-menu.service';

describe('Service: BottomMenu', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [BottomMenuService]
    });
  });

  it('should ...', inject([BottomMenuService], (service: BottomMenuService) => {
    expect(service).toBeTruthy();
  }));
});
