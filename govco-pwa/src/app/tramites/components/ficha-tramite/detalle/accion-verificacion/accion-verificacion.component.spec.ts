import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AccionVerificacionComponent } from './accion-verificacion.component';

describe('AccionVerificacionComponent', () => {
  let component: AccionVerificacionComponent;
  let fixture: ComponentFixture<AccionVerificacionComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AccionVerificacionComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AccionVerificacionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
