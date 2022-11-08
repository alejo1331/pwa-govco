import { ElementRef } from '@angular/core';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { BuscadorPrefiltradoComponent } from '../buscador-prefiltrado.component';

import { ModalPrefiltradoComponent } from './modal-prefiltrado.component';

describe('ModalPrefiltradoComponent', () => {
  let component: ModalPrefiltradoComponent;
  let fixture: ComponentFixture<ModalPrefiltradoComponent>;


  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ModalPrefiltradoComponent],
      providers: [BuscadorPrefiltradoComponent]
    })
      .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ModalPrefiltradoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('Estado inicial (oculto) del modal prefiltrado del buscador', () => {
    const div: ElementRef = fixture.debugElement.query(By.css('.contenido-modal-pwa'));
    const estadoActualModal: String = getComputedStyle(div.nativeElement).getPropertyValue('display');
    expect(estadoActualModal).toEqual('none');
  });

  it('Validación para mostrar y ocultar modal prefiltrado del buscador', () => {
    component.abrirModal();
    const mostrandoModal = fixture.debugElement.query(By.css('.contenido-modal-pwa.on-modal'));
    expect(mostrandoModal.nativeElement.style.display).toEqual('block');

    component.cerrarModal();
    const divModal = fixture.debugElement.query(By.css('.contenido-modal-pwa.off-modal'));
    divModal.nativeElement.addEventListener('animationend', () => {
      const ocultandoModal: String = getComputedStyle(divModal.nativeElement).getPropertyValue('display');
      expect(ocultandoModal).toEqual('none');
    })
  });

});
