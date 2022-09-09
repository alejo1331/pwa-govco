import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { BotonComponent } from './components/boton/boton.component';
import { EtiquetaComponent } from './components/etiqueta/etiqueta.component';
import { TarjetaInformativaComponent } from './components/tarjeta-informativa/tarjeta-informativa.component';
import { CarruselDosComponent } from './components/carrusel-dos/carrusel-dos.component';


@NgModule({
  declarations: [
    BotonComponent,
    EtiquetaComponent,
    TarjetaInformativaComponent,
    CarruselDosComponent
  ],
  imports: [
    CommonModule
  ],
  exports: [
    BotonComponent,
    EtiquetaComponent,
    TarjetaInformativaComponent,
    CarruselDosComponent
  ],
})
export class BibliotecaPwaModule { }
