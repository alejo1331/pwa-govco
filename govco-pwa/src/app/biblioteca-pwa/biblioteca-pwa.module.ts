import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { BotonComponent } from './components/boton/boton.component';
import { EtiquetaComponent } from './components/etiqueta/etiqueta.component';
import { TarjetaInformativaComponent } from './components/tarjeta-informativa/tarjeta-informativa.component';
import { CarruselDosComponent } from './components/carrusel-dos/carrusel-dos.component';
import { CarruselUnoComponent } from './components/carrusel-uno/carrusel-uno.component';
import { AcordeonComponent } from './components/acordeon/acordeon.component';
import { CarruselUnoCopyComponent } from './components/carrusel-uno-copy/carrusel-uno-copy.component';


@NgModule({
  declarations: [
    BotonComponent,
    EtiquetaComponent,
    TarjetaInformativaComponent,
    CarruselUnoComponent,
    CarruselDosComponent,
    AcordeonComponent,
    CarruselUnoCopyComponent
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
    CarruselUnoCopyComponent

  ],
})
export class BibliotecaPwaModule { }
