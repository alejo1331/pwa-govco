import { TestBed, inject } from '@angular/core/testing';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';

import { EjerciciosService } from './ejercicios.service';

describe('EjerciciosService', () => {
  beforeEach(() => TestBed.configureTestingModule({
    imports: [HttpClientTestingModule],
    providers: [EjerciciosService]
  }));

  it('should be created', 
     inject([HttpTestingController, EjerciciosService],
      (httpMock: HttpTestingController, service: EjerciciosService) => {
        expect(service).toBeTruthy();  
    }));

  it('should have getEjercicios function', () => {
    const service: EjerciciosService = TestBed.get(EjerciciosService);
    expect(service.getEjercicios).toBeTruthy();
  });
});
