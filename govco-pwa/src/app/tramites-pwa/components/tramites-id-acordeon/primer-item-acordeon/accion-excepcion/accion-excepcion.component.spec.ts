import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AccionExcepcionComponent } from './accion-excepcion.component';

describe('AccionExcepcionComponent', () => {
  let component: AccionExcepcionComponent;
  let fixture: ComponentFixture<AccionExcepcionComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AccionExcepcionComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AccionExcepcionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('Debe de crearse correctamente', () => {
    expect(component).toBeTruthy();
  });
});
