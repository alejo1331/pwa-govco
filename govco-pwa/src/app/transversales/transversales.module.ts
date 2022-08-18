import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { MatToolbarModule } from '@angular/material/toolbar';
import { BuscadorComponent } from './components/buscador/buscador.component';
import { GeolocalizacionComponent } from './components/geolocalizacion/geolocalizacion.component';
import { ContenidoSideNavComponent } from './components/contenido-side-nav/contenido-side-nav.component';
import { FooterComponent } from './components/footer/footer.component';
import { BottomMenuComponent } from './components/bottom-menu/bottom-menu.component';
import { TransversalesRoutingModule } from './transversales.routing';
import { BarraSuperiorComponent } from './components/barra-superior/barra-superior.component';
import { GeolocalizacionFormularioComponent } from './components/geolocalizacion-formulario/geolocalizacion-formulario.component';
import { ServiciosParaEntidadesComponent } from './components/servicios-para-entidades/servicios-para-entidades.component';
import { CardsServiciosParaEntidadesComponent } from './components/servicios-para-entidades/cards-servicios-para-entidades/cards-servicios-para-entidades.component';
import { AvisoDeConstruccionModule } from '../aviso-de-construccion/aviso-de-construccion.module';
import { MatDialogModule } from '@angular/material/dialog';
import { ConfirmacionUbicacionComponent } from './components/geolocalizacion-formulario/components/confirmacion-ubicacion/confirmacion-ubicacion.component';
import { CajaHerramientasComponent } from './components/caja-herramientas/caja-herramientas.component';
import { BreadCrumbComponent } from './shared/bread-crumb/components/bread-crumb/bread-crumb.component';
import { SafePipe } from './pipes/safe.pipe';


@NgModule({
  imports: [
    CommonModule,
    AvisoDeConstruccionModule,
    FormsModule,
    ReactiveFormsModule,
    MatToolbarModule,
    TransversalesRoutingModule,
    MatDialogModule
  ],
  declarations: [
    BuscadorComponent,
    GeolocalizacionComponent,
    ContenidoSideNavComponent,
    FooterComponent,
    BottomMenuComponent,
    BarraSuperiorComponent,
    GeolocalizacionFormularioComponent,
    ServiciosParaEntidadesComponent,

    ConfirmacionUbicacionComponent,
    CajaHerramientasComponent,
    BreadCrumbComponent,
    SafePipe,
    CardsServiciosParaEntidadesComponent,
    ConfirmacionUbicacionComponent
  ],
  exports: [
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
