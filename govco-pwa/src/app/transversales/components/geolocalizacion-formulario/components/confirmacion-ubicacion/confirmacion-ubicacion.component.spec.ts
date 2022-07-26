import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ConfirmacionUbicacionComponent } from './confirmacion-ubicacion.component';

describe('ConfirmacionUbicacionComponent', () => {
  let component: ConfirmacionUbicacionComponent;
  let fixture: ComponentFixture<ConfirmacionUbicacionComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ConfirmacionUbicacionComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ConfirmacionUbicacionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
