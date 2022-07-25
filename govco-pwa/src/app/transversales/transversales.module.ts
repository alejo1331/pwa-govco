import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

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
import { GeolocalizacionFormularioComponent } from './components/geolocalizacion-formulario/geolocalizacion-formulario.component';
import { ServiciosParaEntidadesComponent } from './components/servicios-para-entidades/servicios-para-entidades.component';
import { AvisoDeConstruccionModule } from '../aviso-de-construccion/aviso-de-construccion.module';


@NgModule({
  imports: [
    CommonModule,
    AvisoDeConstruccionModule,
    FormsModule,
    ReactiveFormsModule,
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
    BarraSuperiorComponent,
    GeolocalizacionFormularioComponent,
    ServiciosParaEntidadesComponent
  ],
  exports: [
    SideNavComponent,
    SideNavItemsComponent,
    GeolocalizacionComponent,
    BuscadorComponent,
    ContenidoSideNavComponent,
    FooterComponent,
    BottomMenuComponent,
    BarraSuperiorComponent,
    GeolocalizacionFormularioComponent
  ],
  schemas:[CUSTOM_ELEMENTS_SCHEMA]
})
export class TransversalesModule { }
