import { TestBed, inject } from '@angular/core/testing';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import { ParticipaService } from './participa.service';



describe('ParticipaService', () => {
  beforeEach(() => TestBed.configureTestingModule({
    imports: [HttpClientTestingModule],
    providers: [ParticipaService]
  }));

  it('should be created', 
     inject([HttpTestingController, ParticipaService],
      (httpMock: HttpTestingController, service: ParticipaService) => {
        expect(service).toBeTruthy();  
    }));

  it('should have getEjercicios function', () => {
    const service: ParticipaService = TestBed.get(ParticipaService);
    expect(service.getHome).toBeTruthy();
  });
});
