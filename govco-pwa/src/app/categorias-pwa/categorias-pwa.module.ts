import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { CategoriasPwaRoutingModule } from './categorias-pwa-routing.module';
import { MomentosDeVidaComponent } from './components/momentos-de-vida/momentos-de-vida.component';
import { DetalleMomentosDeVidaComponent } from './components/detalle-momentos-de-vida/detalle-momentos-de-vida.component';
import { BibliotecaPwaModule } from '../biblioteca-pwa/biblioteca-pwa.module';
import { LoMasConsultadoComponent } from './components/lo-mas-consultado/lo-mas-consultado.component';
import { TodosLosTramitesComponent } from './components/todos-los-tramites/todos-los-tramites.component';
import { BarraFiltrosComponent } from './components/todos-los-tramites/barra-filtros/barra-filtros.component';
import { CardTramiteComponent } from './components/todos-los-tramites/card-tramite/card-tramite.component';
import { MomentosDeVidaCardComponent } from './components/momentos-de-vida/momentos-de-vida-card/momentos-de-vida-card.component';
import { BuscadorPwaModule } from '../buscador-pwa/buscador-pwa.module';
import { HomePwaModule } from '../home-pwa/home-pwa.module';
import { TramitesDestacadosComponent } from './components/tramites-destacados/tramites-destacados.component';
import { FiltrosPrimerNivelComponent } from './components/todos-los-tramites/filtros-primer-nivel/filtros-primer-nivel.component';
import { NgxSkeletonLoaderModule } from 'ngx-skeleton-loader';
import { ActualidadComponent } from './components/actualidad/actualidad.component';
import { AvisoSinResultadosComponent } from './components/aviso-sin-resultados/aviso-sin-resultados.component';
import { ModalAvisoComponent } from './components/modal-aviso/modal-aviso.component';


@NgModule({
  declarations: [
    MomentosDeVidaComponent,
    DetalleMomentosDeVidaComponent,
    LoMasConsultadoComponent,
    TodosLosTramitesComponent,
    BarraFiltrosComponent,
    CardTramiteComponent,
    MomentosDeVidaCardComponent,
    TramitesDestacadosComponent,
    FiltrosPrimerNivelComponent,
    ActualidadComponent,
    AvisoSinResultadosComponent,
    ModalAvisoComponent
  ],
  imports: [
    CommonModule,
    CategoriasPwaRoutingModule,
    BibliotecaPwaModule,
    BuscadorPwaModule,
    HomePwaModule,
    NgxSkeletonLoaderModule,
  ],
  exports: [    
    ModalAvisoComponent,
  ]
})
export class CategoriasPwaModule {}
