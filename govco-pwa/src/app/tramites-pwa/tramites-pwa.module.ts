import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { TramitesPwaRoutingModule } from './tramites-pwa-routing.module';
import { TramitesIdComponent } from './components/tramites-principal/tramites-id.component';
import { BibliotecaPwaModule } from '../biblioteca-pwa/biblioteca-pwa.module';
import { TramitesIdAcordeonComponent } from './components/tramites-id-acordeon/tramites-id-acordeon.component';
import { FichaEspecificaDetallePwaComponent } from './components/ficha-especifica-detalle-pwa/ficha-especifica-detalle-pwa.component';
import { HomePwaModule } from './../home-pwa/home-pwa.module';
import { PrimerItemAcordeonComponent } from './components/tramites-id-acordeon/primer-item-acordeon/primer-item-acordeon.component';
import { PuntosDeAtencionComponent } from './components/puntos-de-atencion/puntos-de-atencion.component';
import { FichaEspecificaHeaderPwaComponent } from './components/ficha-especifica-header-pwa/ficha-especifica-header-pwa.component';

@NgModule({
  declarations: [
    TramitesIdComponent,
    FichaEspecificaHeaderPwaComponent,
    FichaEspecificaDetallePwaComponent,
    TramitesIdAcordeonComponent,
    PrimerItemAcordeonComponent
    PuntosDeAtencionComponent
  ],
  imports: [
    CommonModule,
    TramitesPwaRoutingModule,
    BibliotecaPwaModule,
    HomePwaModule,
  ],
  exports: [
    TramitesIdComponent,
  ],
})
export class TramitesPwaModule {}
