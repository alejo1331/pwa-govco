import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { BuscadorPwaRoutingModule } from './buscador-pwa-routing.module';
import { BuscadorPrincipalComponent } from './components/buscador-principal/buscador-principal.component';
import { FiltrosPrincipalComponent } from './components/filtros-principal/filtros-principal.component';
import { BibliotecaPwaModule } from '../biblioteca-pwa/biblioteca-pwa.module';
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
import { BuscadorCardNoticiasComponent } from './components/buscador-card-acordeon/buscador-card-noticias/buscador-card-noticias.component';
import { BuscadorAvisoComponent } from './components/buscador-aviso/buscador-aviso.component';
import { HomePwaModule } from './../home-pwa/home-pwa.module';
import { BannerCiiuBuscadorComponent } from './components/banner-ciiu-buscador/banner-ciiu-buscador.component';

@NgModule({
  declarations: [
    BuscadorPrincipalComponent,
    FiltrosPrincipalComponent,
    BuscadorCardTramitesComponent,
    BuscadorCardEntidadesComponent,
    BuscadorCardPortalesComponent,
    BarraFiltrosComponent,
    BuscadorCardVentanillaComponent,
    BuscadorCardEjerciciosParticipacionComponent,
    BuscadorNivelDosComponent,
    NivelDosHeaderBuscadorComponent,
    NivelDosHeaderPrefiltrosComponent,
    ListadoSugerenciasComponent,
    BuscadorAvisoComponent,
    BuscadorCardNoticiasComponent,
    BannerCiiuBuscadorComponent,
  ],
  imports: [
    CommonModule,
    BuscadorPwaRoutingModule,
    BibliotecaPwaModule,
    NgxSkeletonLoaderModule,
    BrowserAnimationsModule,
    HomePwaModule,
  ],
  exports: [
    BuscadorPrincipalComponent,
    BuscadorNivelDosComponent,
    BannerCiiuBuscadorComponent,
  ],
})
export class BuscadorPwaModule {}
