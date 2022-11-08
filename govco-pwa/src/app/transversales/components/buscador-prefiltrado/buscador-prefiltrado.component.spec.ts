import { ElementRef } from '@angular/core';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';

import { BuscadorPrefiltradoComponent } from './buscador-prefiltrado.component';

describe('BuscadorPrefiltradoComponent', () => {
  let component: BuscadorPrefiltradoComponent;
  let fixture: ComponentFixture<BuscadorPrefiltradoComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ BuscadorPrefiltradoComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(BuscadorPrefiltradoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  })
  
  it('Validacion boton control lazamiento modal prefiltrado', () => {
    const boton: ElementRef = fixture.debugElement.query(By.css('.boton-filtro'));
    boton.nativeElement.click();
    expect(component.estadoBotonFiltro).toBeTrue();
    boton.nativeElement.click();
    expect(component.estadoBotonFiltro).toBeFalse();
  });

  it('Validacion titulo boton control lazamiento modal prefiltrado', () => {
    component.itemSelected(['Noticias', false , 2 ,'noticia']);
    const tituloBoton: ElementRef = fixture.debugElement.query(By.css('.boton-filtro p'));
    expect(component.titleSeccion[component.posicion]).toEqual('Noticias')
  });

});
