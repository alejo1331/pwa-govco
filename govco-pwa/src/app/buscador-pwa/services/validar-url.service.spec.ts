import { TestBed } from '@angular/core/testing';
import { MatDialogModule } from '@angular/material/dialog';

import { ValidarUrlService } from './validar-url.service';

describe('ValidarUrlService', () => {
  let service: ValidarUrlService;

  beforeEach(() => {
    TestBed.configureTestingModule({
        imports: [MatDialogModule],
        providers: [ValidarUrlService]
    });
    service = TestBed.get(ValidarUrlService);
  }); 

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ValidarUrlService);
  });

  it('Debe de crearse correctamente', () => {
    expect(service).toBeTruthy();
  });
});
