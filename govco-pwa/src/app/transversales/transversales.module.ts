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
import { LevelOneBreadCrumbsComponent } from './shared/components/level-one-bread-crumbs/level-one-bread-crumbs.component';
import { SafePipe } from './pipes/safe.pipe';
import { BannerSeccionesInternasComponent } from './shared/components/banner-secciones-internas/banner-secciones-internas.component';
import { BannerDetalleInternasDosComponent } from './shared/components/banner-detalle-internas-dos/banner-detalle-internas-dos.component';
import { LevelTwoBreadCrumbsComponent } from './shared/components/level-two-bread-crumbs/level-two-bread-crumbs.component';
import { PipesModule } from '../pipes/pipes.module';
import { ModalInformacionComponent } from './shared/modal-informacion/modal-informacion.component';
import { RecaptchaModule } from "ng-recaptcha";
import { LoginComponent } from './components/login/login.component';


@NgModule({
  imports: [
    CommonModule,
    AvisoDeConstruccionModule,
    FormsModule,
    ReactiveFormsModule,
    MatToolbarModule,
    TransversalesRoutingModule,
    MatDialogModule,
    PipesModule,
    RecaptchaModule

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
    CardsServiciosParaEntidadesComponent,
    ConfirmacionUbicacionComponent,
    CajaHerramientasComponent,
    ModalInformacionComponent,
    LoginComponent,
    SafePipe,
    CardsServiciosParaEntidadesComponent,
    ConfirmacionUbicacionComponent,
    BannerSeccionesInternasComponent,
    BannerDetalleInternasDosComponent,
    LevelOneBreadCrumbsComponent,
    LevelTwoBreadCrumbsComponent
  ],
  exports: [
    GeolocalizacionComponent,
    BuscadorComponent,
    ContenidoSideNavComponent,
    FooterComponent,
    BottomMenuComponent,
    BarraSuperiorComponent,
    GeolocalizacionFormularioComponent,
    BannerSeccionesInternasComponent,
    BannerDetalleInternasDosComponent,
    LevelOneBreadCrumbsComponent,
    LevelTwoBreadCrumbsComponent,
    LoginComponent,
  ],
  schemas:[CUSTOM_ELEMENTS_SCHEMA]
})
export class TransversalesModule { }
