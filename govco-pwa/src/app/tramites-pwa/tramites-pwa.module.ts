import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { TramitesPwaRoutingModule } from './tramites-pwa-routing.module';
import { TramitesIdComponent } from './components/tramites-principal/tramites-id.component';
import { BibliotecaPwaModule } from '../biblioteca-pwa/biblioteca-pwa.module';
import { TramitesIdAcordeonComponent } from './components/tramites-id-acordeon/tramites-id-acordeon.component';
import { FichaEspecificaDetallePwaComponent } from './components/ficha-especifica-detalle-pwa/ficha-especifica-detalle-pwa.component';
import { HomePwaModule } from './../home-pwa/home-pwa.module';
import { PrimerItemAcordeonComponent } from './components/tramites-id-acordeon/primer-item-acordeon/primer-item-acordeon.component';
import { PuntosDeAtencionComponent } from './components/puntos-de-atencion/puntos-de-atencion.component';
import { FichaEspecificaHeaderPwaComponent } from './components/ficha-especifica-header-pwa/ficha-especifica-header-pwa.component';
import { AccionSolicitudComponent } from './components/tramites-id-acordeon/primer-item-acordeon/accion-solicitud/accion-solicitud.component';
import { AccionVerificacionComponent } from './components/tramites-id-acordeon/primer-item-acordeon/accion-verificacion/accion-verificacion.component';
import { AccionPagoComponent } from './components/tramites-id-acordeon/primer-item-acordeon/accion-pago/accion-pago.component';
import { AccionFormularioComponent } from './components/tramites-id-acordeon/primer-item-acordeon/accion-formulario/accion-formulario.component';
import { AccionDocumentoComponent } from './components/tramites-id-acordeon/primer-item-acordeon/accion-documento/accion-documento.component';
import { NgxSkeletonLoaderModule } from 'ngx-skeleton-loader';
import { FichaEspecificaCardsPwaComponent } from './components/ficha-especifica-cards-pwa/ficha-especifica-cards-pwa.component';
import { FichaEspecificaFooterPwaComponent } from './components/ficha-especifica-footer-pwa/ficha-especifica-footer-pwa.component';
import { AccionExcepcionComponent } from './components/tramites-id-acordeon/primer-item-acordeon/accion-excepcion/accion-excepcion.component';
import { SegundoItemAcordeonComponent } from './components/tramites-id-acordeon/segundo-item-acordeon/segundo-item-acordeon.component';
import { ModalTutorialesPwaComponent } from './components/modal-tutoriales-pwa/modal-tutoriales-pwa.component';
import { ModalDudasPwaComponent } from './components/modal-dudas-pwa/modal-dudas-pwa.component';
import { TercerItemAcordeonComponent } from './components/tramites-id-acordeon/tercer-item-acordeon/tercer-item-acordeon.component';
import { CuartoItemAcordeonComponent } from './components/tramites-id-acordeon/cuarto-item-acordeon/cuarto-item-acordeon.component';
import { QuintoItemAcordeonComponent } from './components/tramites-id-acordeon/quinto-item-acordeon/quinto-item-acordeon.component';

@NgModule({
  declarations: [
    TramitesIdComponent,
    FichaEspecificaHeaderPwaComponent,
    FichaEspecificaDetallePwaComponent,
    TramitesIdAcordeonComponent,
    PrimerItemAcordeonComponent,
    PuntosDeAtencionComponent,
    AccionSolicitudComponent,
    AccionVerificacionComponent,
    AccionPagoComponent,
    AccionFormularioComponent,
    AccionDocumentoComponent,
    FichaEspecificaCardsPwaComponent,
    FichaEspecificaFooterPwaComponent,
    SegundoItemAcordeonComponent,
    ModalTutorialesPwaComponent,
    ModalDudasPwaComponent,
    AccionExcepcionComponent,
    TercerItemAcordeonComponent,
    CuartoItemAcordeonComponent,
    QuintoItemAcordeonComponent
  ],
  imports: [
    CommonModule,
    TramitesPwaRoutingModule,
    BibliotecaPwaModule,
    HomePwaModule,
    NgxSkeletonLoaderModule,
  ],
  exports: [TramitesIdComponent],
})
export class TramitesPwaModule {}
