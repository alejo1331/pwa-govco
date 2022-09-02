import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ModalFechasDisponiblesComponent } from './modal-fechas-disponibles.component';

describe('ModalFechasDisponiblesComponent', () => {
  let component: ModalFechasDisponiblesComponent;
  let fixture: ComponentFixture<ModalFechasDisponiblesComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ModalFechasDisponiblesComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ModalFechasDisponiblesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
