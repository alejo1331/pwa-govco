import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { MapaDelSitioRoutingModule } from './mapa-del-sitio-routing.module';
import { MapaDelSitioComponent } from './components/mapa-del-sitio/mapa-del-sitio.component';


@NgModule({
  declarations: [
    MapaDelSitioComponent
  ],
  imports: [
    CommonModule,
    MapaDelSitioRoutingModule
  ],
  exports: [
    MapaDelSitioComponent
  ]
})
export class MapaDelSitioModule { }
