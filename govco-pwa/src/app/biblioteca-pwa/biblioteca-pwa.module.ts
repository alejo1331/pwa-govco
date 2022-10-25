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
import { NivelDosHeaderBuscadorComponent } from './components/nivel-dos-header-buscador/nivel-dos-header-buscador.component';
import { NivelDosHeaderPrefiltrosComponent } from './components/nivel-dos-header-prefiltros/nivel-dos-header-prefiltros.component';



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
    NivelDosHeaderBuscadorComponent,
    NivelDosHeaderPrefiltrosComponent
  ],
  imports: [
    CommonModule,
    RouterModule,
    MatDialogModule,
    FormsModule
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
    NivelDosHeaderBuscadorComponent,
    NivelDosHeaderPrefiltrosComponent
  ],
})
export class BibliotecaPwaModule {}
