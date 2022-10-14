import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { BuscadorPwaRoutingModule } from './buscador-pwa-routing.module';
import { BuscadorPrincipalComponent } from './buscador-principal/buscador-principal.component';


@NgModule({
  declarations: [
    BuscadorPrincipalComponent,
  ],
  imports: [
    CommonModule,
    BuscadorPwaRoutingModule,
  ],
  exports:[ 
    BuscadorPrincipalComponent,
  ]
})
export class BuscadorPwaModule { }
