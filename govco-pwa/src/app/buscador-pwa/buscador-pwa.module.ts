import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { BuscadorPwaRoutingModule } from './buscador-pwa-routing.module';
import { BuscadorPrincipalComponent } from './components/buscador-principal/buscador-principal.component';
import { FiltrosPrincipalComponent } from './components/filtros-principal/filtros-principal.component';
import { BibliotecaPwaModule } from '../biblioteca-pwa/biblioteca-pwa.module';
import { BuscadorCardAcordeonComponent } from './components/buscador-card-acordeon/buscador-card-acordeon.component';
import { BuscadorCardTramitesComponent } from './components/buscador-card-acordeon/buscador-card-tramites/buscador-card-tramites.component';
import { BuscadorCardEntidadesComponent } from './components/buscador-card-acordeon/buscador-card-entidades/buscador-card-entidades.component';
import { BuscadorCardPortalesComponent } from './components/buscador-card-acordeon/buscador-card-portales/buscador-card-portales.component';
import { BarraFiltrosComponent } from './components/barra-filtros/barra-filtros.component';
import { BuscadorCardVentanillaComponent } from './components/buscador-card-acordeon/buscador-card-ventanilla/buscador-card-ventanilla.component';
import { BuscadorCardEjerciciosParticipacionComponent } from './components/buscador-card-acordeon/buscador-card-ejercicios-participacion/buscador-card-ejercicios-participacion.component';
import { NgxSkeletonLoaderModule } from 'ngx-skeleton-loader';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { BuscadorNivelDosComponent } from './components/buscador-nivel-dos/buscador-nivel-dos.component';
import { NivelDosHeaderBuscadorComponent } from './components/buscador-nivel-dos/nivel-dos-header-buscador/nivel-dos-header-buscador.component';
import { NivelDosHeaderPrefiltrosComponent } from './components/buscador-nivel-dos/nivel-dos-header-prefiltros/nivel-dos-header-prefiltros.component';
import { ListadoSugerenciasComponent } from './components/buscador-nivel-dos/listado-sugerencias/listado-sugerencias.component';


@NgModule({
  declarations: [
    BuscadorPrincipalComponent,
    FiltrosPrincipalComponent,
    BuscadorCardAcordeonComponent,
    BuscadorCardTramitesComponent,
    BuscadorCardEntidadesComponent,
    BuscadorCardPortalesComponent,
    BarraFiltrosComponent,
    BuscadorCardVentanillaComponent,
    BuscadorCardEjerciciosParticipacionComponent,
    BuscadorNivelDosComponent,
    NivelDosHeaderBuscadorComponent,
    NivelDosHeaderPrefiltrosComponent,
    ListadoSugerenciasComponent

  ],
  imports: [
    CommonModule,
    BuscadorPwaRoutingModule,
    BibliotecaPwaModule,
    NgxSkeletonLoaderModule,
    BrowserAnimationsModule

  ],
  exports:[
    BuscadorPrincipalComponent,
    BuscadorNivelDosComponent
  ]
})
export class BuscadorPwaModule { }
