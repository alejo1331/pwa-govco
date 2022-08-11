import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ModalSitioNoDisponibleComponent } from './modal-sitio-no-disponible.component';

describe('ModalSitioNoDisponibleComponent', () => {
  let component: ModalSitioNoDisponibleComponent;
  let fixture: ComponentFixture<ModalSitioNoDisponibleComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ModalSitioNoDisponibleComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ModalSitioNoDisponibleComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
