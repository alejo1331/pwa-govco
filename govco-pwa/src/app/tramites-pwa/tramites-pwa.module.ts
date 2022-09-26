import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { TramitesPwaRoutingModule } from './tramites-pwa-routing.module';
import { TramitesPrincipalComponent } from './components/tramites-principal/tramites-principal.component';
import { BibliotecaPwaModule } from '../biblioteca-pwa/biblioteca-pwa.module';


@NgModule({
  declarations: [
    TramitesPrincipalComponent
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
