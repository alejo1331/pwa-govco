import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { BotonComponent } from './components/boton/boton.component';
import { EtiquetaComponent } from './components/etiqueta/etiqueta.component';
import { TarjetaInformativaComponent } from './components/tarjeta-informativa/tarjeta-informativa.component';
import { CarruselDosComponent } from './components/carrusel-dos/carrusel-dos.component';
import { CarruselUnoComponent } from './components/carrusel-uno/carrusel-uno.component';
import { AcordeonComponent } from './components/acordeon/acordeon.component';
import { NivelDosComponent } from './components/nivel-dos/nivel-dos.component';
import { DesplegableUnoComponent } from './components/desplegable-uno/desplegable-uno.component';
import { FooterComponent } from './components/footer/footer.component';
import { BuscadorSencilloV1Component } from './components/buscador-sencillo-v1/buscador-sencillo-v1.component';



@NgModule({
  declarations: [
    BotonComponent,
    EtiquetaComponent,
    TarjetaInformativaComponent,
    CarruselUnoComponent,
    CarruselDosComponent,
    AcordeonComponent,
    FooterComponent,
    DesplegableUnoComponent,
    NivelDosComponent,
    BuscadorSencilloV1Component,
  ],
  imports: [
    CommonModule
  ],
  exports: [
    BotonComponent,
    EtiquetaComponent,
    TarjetaInformativaComponent,
    CarruselUnoComponent,
    CarruselDosComponent,
    AcordeonComponent,
    FooterComponent,
    DesplegableUnoComponent,
    NivelDosComponent,
    BuscadorSencilloV1Component,
  ],
})
export class BibliotecaPwaModule { }
