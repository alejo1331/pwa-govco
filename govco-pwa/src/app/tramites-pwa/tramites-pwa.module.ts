import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { TramitesPwaRoutingModule } from './tramites-pwa-routing.module';
import { TramitesIdComponent } from './components/tramites-principal/tramites-id.component';
import { BibliotecaPwaModule } from '../biblioteca-pwa/biblioteca-pwa.module';
import { FichaEspecificaPwaComponent } from './components/ficha-especifica-pwa/ficha-especifica-pwa.component';
import { FichaEspecificaHeaderPwaComponent } from './components/ficha-especifica-pwa/ficha-especifica-header-pwa/ficha-especifica-header-pwa.component';
import { FichaEspecificaDetallePwaComponent } from './components/ficha-especifica-pwa/ficha-especifica-detalle-pwa/ficha-especifica-detalle-pwa.component';

@NgModule({
  declarations: [TramitesIdComponent, FichaEspecificaPwaComponent, FichaEspecificaHeaderPwaComponent, FichaEspecificaDetallePwaComponent],
  imports: [CommonModule, TramitesPwaRoutingModule, BibliotecaPwaModule],
  exports: [],
})
export class TramitesPwaModule {}
