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
  ],
  imports: [
    CommonModule,
    BuscadorPwaRoutingModule,
    BibliotecaPwaModule,
    NgxSkeletonLoaderModule,

  ],
  exports:[ 
    BuscadorPrincipalComponent,
  ]
})
export class BuscadorPwaModule { }
