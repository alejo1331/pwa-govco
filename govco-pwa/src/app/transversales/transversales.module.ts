import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatToolbarModule } from '@angular/material/toolbar';
import { SideNavComponent } from './side-nav/side-nav.component';
import { SideNavItemsComponent } from "./side-nav-items/side-nav-items.component";
import { BuscadorComponent } from './buscador/buscador.component';
import { GeolocalizacionComponent } from './geolocalizacion/geolocalizacion.component';
import { BarraSuperiorInternaComponent } from './barra-superior-interna/barra-superior-interna.component';
import { BarraSuperiorGeneralComponent } from './barra-superior-general/barra-superior-general.component';

@NgModule({
  imports: [
    CommonModule,
    MatToolbarModule,
  ],
  declarations: [
    SideNavComponent, 
    SideNavItemsComponent, 
    BuscadorComponent, 
    GeolocalizacionComponent, 
    BarraSuperiorInternaComponent, 
    BarraSuperiorGeneralComponent
  ],
  exports: [
    SideNavComponent, 
    SideNavItemsComponent, 
    BarraSuperiorInternaComponent, 
    BarraSuperiorGeneralComponent,
    GeolocalizacionComponent,
    BuscadorComponent
  ]
})
export class TransversalesModule { }
