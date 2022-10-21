import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { BuscadorPwaRoutingModule } from './buscador-pwa-routing.module';
import { BuscadorPrincipalComponent } from './components/buscador-principal/buscador-principal.component';
import { FiltrosPrincipalComponent } from './components/filtros-principal/filtros-principal.component';
import { BibliotecaPwaModule } from '../biblioteca-pwa/biblioteca-pwa.module';


@NgModule({
  declarations: [
    BuscadorPrincipalComponent,
    FiltrosPrincipalComponent,
  ],
  imports: [
    CommonModule,
    BuscadorPwaRoutingModule,
    BibliotecaPwaModule,

  ],
  exports:[ 
    BuscadorPrincipalComponent,
  ]
})
export class BuscadorPwaModule { }
