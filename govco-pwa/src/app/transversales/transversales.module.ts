import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatToolbarModule } from '@angular/material/toolbar';
import { SideNavComponent } from './components/side-nav/side-nav.component';
import { SideNavItemsComponent } from "./components/side-nav-items/side-nav-items.component";
import { BuscadorComponent } from './components/buscador/buscador.component';
import { GeolocalizacionComponent } from './components/geolocalizacion/geolocalizacion.component';
import { ContenidoSideNavComponent } from './components/contenido-side-nav/contenido-side-nav.component';
import { FooterComponent } from './components/footer/footer.component';
import { BottomMenuComponent } from './components/bottom-menu/bottom-menu.component';
import { TransversalesRoutingModule } from './transversales.routing';
import { BarraSuperiorComponent } from './components/barra-superior/barra-superior.component';


@NgModule({
  imports: [
    CommonModule,
    MatToolbarModule,
    TransversalesRoutingModule
  ],
  declarations: [
    SideNavComponent,
    SideNavItemsComponent,
    BuscadorComponent,
    GeolocalizacionComponent,
    ContenidoSideNavComponent,
    FooterComponent,
    BottomMenuComponent,
    BarraSuperiorComponent
  ],
  exports: [
    SideNavComponent,
    SideNavItemsComponent,
    GeolocalizacionComponent,
    BuscadorComponent,
    ContenidoSideNavComponent,
    FooterComponent,
    BottomMenuComponent,
    BarraSuperiorComponent
  ]
})
export class TransversalesModule { }
