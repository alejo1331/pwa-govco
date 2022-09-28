import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { TramitesPwaRoutingModule } from './tramites-pwa-routing.module';
import { TramitesIdComponent } from './components/tramites-principal/tramites-id.component';
import { BibliotecaPwaModule } from '../biblioteca-pwa/biblioteca-pwa.module';
import { TramitesIdAcordeonComponent } from './components/tramites-id-acordeon/tramites-id-acordeon.component';


@NgModule({
  declarations: [
    TramitesIdComponent,
    TramitesIdAcordeonComponent
  ],
  imports: [
    CommonModule,
    TramitesPwaRoutingModule,
    BibliotecaPwaModule
  ],
  exports: [

  ]
})
export class TramitesPwaModule { }
