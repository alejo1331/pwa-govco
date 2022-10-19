import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { BuscadorPwaRoutingModule } from './buscador-pwa-routing.module';
import { BuscadorPrincipalComponent } from './buscador-principal/buscador-principal.component';
import { FiltrosPrincipalComponent } from './components/filtros-principal/filtros-principal.component';


@NgModule({
  declarations: [
    BuscadorPrincipalComponent,
    FiltrosPrincipalComponent,
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
