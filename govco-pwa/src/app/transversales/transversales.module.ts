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
import { RegistroComponent } from './components/registro/registro.component';
import { ModalNatvivoModule } from '../modal-natvivo/modal-natvivo.module';
import { BuscadorBarraPwaComponent } from './components/buscador-barra-pwa/buscador-barra-pwa.component';
import { PortalesComponent } from './components/portales/portales.component';
import { NgxPaginationModule } from 'ngx-pagination';
import { BreadCrumbComponent } from './shared/components/bread-crumb/components/bread-crumb/bread-crumb.component';


@NgModule({
  imports: [
    CommonModule,
    AvisoDeConstruccionModule,
    FormsModule,
    ReactiveFormsModule,
    MatToolbarModule,
    TransversalesRoutingModule,
    PipesModule,
    RecaptchaModule,
    ModalNatvivoModule,
    NgxPaginationModule
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
    CajaHerramientasComponent,
    ModalInformacionComponent,
    LoginComponent,
    RegistroComponent,
    SafePipe,
    CardsServiciosParaEntidadesComponent,
    BannerSeccionesInternasComponent,
    BannerDetalleInternasDosComponent,
    LevelOneBreadCrumbsComponent,
    LevelTwoBreadCrumbsComponent,
    BuscadorBarraPwaComponent,
    PortalesComponent,
    BreadCrumbComponent
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
    BuscadorBarraPwaComponent,
  ],
  schemas:[CUSTOM_ELEMENTS_SCHEMA]
})
export class TransversalesModule { }
