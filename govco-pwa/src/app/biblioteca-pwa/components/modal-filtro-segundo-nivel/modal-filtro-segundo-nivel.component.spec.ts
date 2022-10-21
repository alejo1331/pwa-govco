import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ModalFiltroSegundoNivelComponent } from './modal-filtro-segundo-nivel.component';

describe('ModalFiltroSegundoNivelComponent', () => {
  let component: ModalFiltroSegundoNivelComponent;
  let fixture: ComponentFixture<ModalFiltroSegundoNivelComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ModalFiltroSegundoNivelComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ModalFiltroSegundoNivelComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
