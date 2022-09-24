import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { TramitesPwaRoutingModule } from './tramites-pwa-routing.module';
import { TramitesPrincipalComponent } from './components/tramites-principal/tramites-principal.component';


@NgModule({
  declarations: [
    TramitesPrincipalComponent
  ],
  imports: [
    CommonModule,
    TramitesPwaRoutingModule
  ]
})
export class TramitesPwaModule { }
