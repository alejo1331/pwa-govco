import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { BotonComponent } from './components/boton/boton.component';
import { EtiquetaComponent } from './components/etiqueta/etiqueta.component';
import { TarjetaInformativaComponent } from './components/tarjeta-informativa/tarjeta-informativa.component';


@NgModule({
  declarations: [
    BotonComponent,
    EtiquetaComponent,
    TarjetaInformativaComponent
  ],
  imports: [
    CommonModule
  ],
  exports: [
    BotonComponent,
    EtiquetaComponent,
    TarjetaInformativaComponent
  ],
})
export class BibliotecaPwaModule { }
