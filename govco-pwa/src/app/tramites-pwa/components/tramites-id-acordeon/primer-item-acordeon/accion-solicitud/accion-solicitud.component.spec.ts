import { ComponentFixture, TestBed } from '@angular/core/testing';
import { HttpClientTestingModule } from '@angular/common/http/testing';

import { AccionSolicitudComponent } from './accion-solicitud.component';
import { TramitesPorIdService } from 'src/app/tramites-pwa/services/tramites-por-id-service/tramites-por-id.service';
import { ValidateUrlService } from 'src/app/tramites-pwa/services/validate-url.service';

describe('AccionSolicitudComponent', () => {
  let component: AccionSolicitudComponent;
  let fixture: ComponentFixture<AccionSolicitudComponent>;
  let validateUrlService: ValidateUrlService;
  let TramitesPorIdservice: TramitesPorIdService;
  let httpClientSpy: { get: jasmine.Spy };

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AccionSolicitudComponent ],      
      imports: [HttpClientTestingModule]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AccionSolicitudComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('Debe de crearse correctamente', () => {
    expect(component).toBeTruthy();
  });
});
