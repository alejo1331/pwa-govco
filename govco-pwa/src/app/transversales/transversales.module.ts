import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatToolbarModule } from '@angular/material/toolbar';
import { SideNavComponent } from './side-nav/side-nav.component';
import { SideNavItemsComponent } from "./side-nav-items/side-nav-items.component";
import { BuscadorComponent } from './buscador/buscador.component';
import { GeolocalizacionComponent } from './geolocalizacion/geolocalizacion.component';
import { BarraSuperiorInternaComponent } from './barra-superior-interna/barra-superior-interna.component';
import { BarraSuperiorGeneralComponent } from './barra-superior-general/barra-superior-general.component';
import { ContenidoSideNavComponent } from './contenido-side-nav/contenido-side-nav.component';
import { FooterComponent } from './footer/footer.component';

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
    BarraSuperiorGeneralComponent,
    ContenidoSideNavComponent,
    FooterComponent
  ],
  exports: [
    SideNavComponent,
    SideNavItemsComponent,
    BarraSuperiorInternaComponent,
    BarraSuperiorGeneralComponent,
    GeolocalizacionComponent,
    BuscadorComponent,
    ContenidoSideNavComponent,
    FooterComponent
  ]
})
export class TransversalesModule { }
