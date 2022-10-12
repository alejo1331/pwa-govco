import { ComponentFixture, TestBed } from '@angular/core/testing';
import { HttpClientTestingModule } from '@angular/common/http/testing';

import { PrimerItemAcordeonComponent } from './primer-item-acordeon.component';
import { TramitesPorIdService } from 'src/app/tramites-pwa/services/tramites-por-id-service/tramites-por-id.service';

describe('PrimerItemAcordeonComponent', () => {
  let component: PrimerItemAcordeonComponent;
  let fixture: ComponentFixture<PrimerItemAcordeonComponent>;
  let fichaTramiteService: TramitesPorIdService;
  let httpClientSpy: { get: jasmine.Spy };

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ PrimerItemAcordeonComponent ],
      imports: [HttpClientTestingModule]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(PrimerItemAcordeonComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
    fichaTramiteService = new TramitesPorIdService(httpClientSpy as any);
  });

  it('Debe de crearse correctamente', () => {
    expect(component).toBeTruthy();
  });
});
