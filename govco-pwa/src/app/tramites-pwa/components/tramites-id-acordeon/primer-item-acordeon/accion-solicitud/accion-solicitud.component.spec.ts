import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AccionSolicitudComponent } from './accion-solicitud.component';

describe('AccionSolicitudComponent', () => {
  let component: AccionSolicitudComponent;
  let fixture: ComponentFixture<AccionSolicitudComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AccionSolicitudComponent ]
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
