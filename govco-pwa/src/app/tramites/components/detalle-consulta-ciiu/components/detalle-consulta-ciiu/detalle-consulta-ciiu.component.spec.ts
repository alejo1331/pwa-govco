import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DetalleConsultaCiiuComponent } from './detalle-consulta-ciiu.component';

describe('DetalleConsultaCiiuComponent', () => {
  let component: DetalleConsultaCiiuComponent;
  let fixture: ComponentFixture<DetalleConsultaCiiuComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DetalleConsultaCiiuComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(DetalleConsultaCiiuComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
