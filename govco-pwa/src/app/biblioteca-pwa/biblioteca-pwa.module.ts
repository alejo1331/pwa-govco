import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
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
import { HeaderCompartirV1Component } from './components/nivel-dos-header-v1/header-compartir-v1.component';
import { TarjetaVinculoComponent } from './components/tarjeta-vinculo/tarjeta-vinculo.component';
import { ModalErrorUrlComponent } from './components/modal-error-url/modal-error-url.component';
import { MatDialogModule } from '@angular/material/dialog';
import { FiltroSegundoNivel } from './pipes/filtro-segundo-nivel/filtro-segundo-nivel.pipe';
import { ModalFiltroSegundoNivelComponent } from './components/modal-filtro-segundo-nivel/modal-filtro-segundo-nivel.component';
import { FormsModule } from '@angular/forms';
import { DescripcionEmergenteComponent } from './components/descripcion-emergente/descripcion-emergente.component';
import { MatChipsModule } from '@angular/material/chips';
import { ChipComponent } from './components/chip/chip.component';
import { MatIconModule } from '@angular/material/icon';
import { ModalUrlNoDisponibleComponent } from './components/modal-url-no-disponible/modal-url-no-disponible.component';


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
    HeaderCompartirV1Component,
    TarjetaVinculoComponent,
    ModalErrorUrlComponent,
    FiltroSegundoNivel,
    ModalFiltroSegundoNivelComponent,
    ChipComponent,
    DescripcionEmergenteComponent,
    ModalUrlNoDisponibleComponent
  ],
  imports: [
    CommonModule,
    RouterModule,
    MatDialogModule,
    FormsModule,
    MatChipsModule,
    MatIconModule
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
    HeaderCompartirV1Component,
    TarjetaVinculoComponent,
    ModalErrorUrlComponent,
    ModalFiltroSegundoNivelComponent,
    DescripcionEmergenteComponent,
    ModalUrlNoDisponibleComponent,
    ChipComponent,
  ],
})
export class BibliotecaPwaModule {}
