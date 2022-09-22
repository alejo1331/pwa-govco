import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ModalAgradecimientoComponent } from './modal-agradecimiento.component';

describe('ModalAgradecimientoComponent', () => {
  let component: ModalAgradecimientoComponent;
  let fixture: ComponentFixture<ModalAgradecimientoComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ModalAgradecimientoComponent],
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ModalAgradecimientoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('Debe de crearse correctamente', () => {
    expect(component).toBeTruthy();
  });
});
