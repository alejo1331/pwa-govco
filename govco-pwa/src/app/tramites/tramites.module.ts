import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { CommonModule } from '@angular/common';
import { TramitesHomeComponent } from './components/tramites-home//tramites-home.component';
import { TramitesRoutingModule } from './tramites-routing.module';
import { AvisoDeConstruccionModule } from '../aviso-de-construccion/aviso-de-construccion.module';
import { CodigosCiiuYTramitesComponent } from './components/codigos-ciiu-y-tramites/codigos-ciiu-y-tramites.component';
import { BusquedaCodigosCiiuComponent } from './components/codigos-ciiu-y-tramites/busqueda-codigos-ciiu/busqueda-codigos-ciiu.component';
import {LoadingService} from './services/loading.service'
import { AutocompleteLibModule } from 'angular-ng-autocomplete';
import { NgxPaginationModule } from 'ngx-pagination';
import { NgSelectModule } from 'ng-custom-select';
import { NgSelect2Module } from 'ng-select2';
import { TablaCodigosCiiuComponent } from './components/codigos-ciiu-y-tramites/tabla-codigos-ciiu/tabla-codigos-ciiu.component';
import { ServiciosYTramitesBuscadorComponent } from './components/ficha-tramite/servicios-y-tramites-buscador/servicios-y-tramites-buscador.component';
import { ServiciosYTramitesListComponent } from './components/ficha-tramite/servicios-y-tramites-list/servicios-y-tramites-list.component';
import { CarouselModule } from 'ngx-owl-carousel-o';
import { CategoriasComponent } from './components/ficha-tramite/categorias/categorias.component';
import { BannerCiiuComponent } from './components/ficha-tramite/banner-ciiu/banner-ciiu.component';
import { DownloadComponent } from './components/ficha-tramite/download/download.component';
import { VentanillasComponent } from './components/ficha-tramite/ventanillas/ventanillas.component';
import { ModalVerNotaComponent } from './components/codigos-ciiu-y-tramites/modal-ver-nota/modal-ver-nota.component';
import { MensajeSinDatosCiiuComponent } from './components/codigos-ciiu-y-tramites/mensaje-sin-datos-ciiu/mensaje-sin-datos-ciiu.component';
import { TransversalesModule } from '../transversales/transversales.module';
import { GeneralComponent } from './components/ficha-tramite/detalle/general/general.component';
import { FichaEspecificaComponent } from './components/ficha-tramite/detalle/ficha-especifica/ficha-especifica.component';
import { FichaNoSuiteComponent } from './components/ficha-tramite/detalle/ficha-no-suite/ficha-no-suite.component';
import { ModalAlertasComponent } from './components/ficha-tramite/detalle/modal-alertas/modal-alertas.component';
import { LineaAvanceComponent } from './components/ficha-tramite/detalle/linea-avance/linea-avance.component';
import { FichaespecificaHeaderComponent } from './components/ficha-tramite/detalle/fichaespecifica-header/fichaespecifica-header.component';
import { FichaespecificaDetalleComponent } from './components/ficha-tramite/detalle/fichaespecifica-detalle/fichaespecifica-detalle.component';
import { ConfirmModalComponent } from './components/detalle-consulta-ciiu/components/confirm-modal/confirm-modal.component';
// import { ConfirmModalComponent } from './components/ficha-tramite/confirm-modal/confirm-modal.component';
import { BtnPuntosAtencionComponent } from './components/ficha-tramite/btn-puntos-atencion/btn-puntos-atencion.component';
import { PuntosAtencionModalComponent } from './components/ficha-tramite/puntos-atencion-modal/puntos-atencion-modal.component';
import { MapaModalComponent } from './components/ficha-tramite/mapa-modal/mapa-modal.component';
import { ModalFechasDisponiblesComponent } from './components/ficha-tramite/modal-fechas-disponibles/modal-fechas-disponibles.component';
import { FormsModule } from '@angular/forms';
import { BtnTramiteLineaComponent } from './components/ficha-tramite/btn-tramite-linea/btn-tramite-linea.component';
import { TutorialesComponent } from './components/ficha-tramite/detalle/tutoriales/tutoriales.component';
import { ModalTutorialesComponent } from './components/ficha-tramite/detalle/modal-tutoriales/modal-tutoriales.component';
import { AyudaComponent } from './components/ficha-tramite/detalle/ayuda/ayuda.component';
import { AtencionComponent } from './components/ficha-tramite/detalle/atencion/atencion.component';
import { FichaespecificaAccordionComponent } from './components/ficha-tramite/detalle/fichaespecifica-accordion/fichaespecifica-accordion.component';
import { FichaespecificaResultadoComponent } from './components/ficha-tramite/detalle/fichaespecifica-resultado/fichaespecifica-resultado.component';
import { LegislacionAsociadaComponent } from './components/ficha-tramite/detalle/legislacion-asociada/legislacion-asociada.component';
import { FichaespecificaFooterComponent } from './components/ficha-tramite/detalle/fichaespecifica-footer/fichaespecifica-footer.component';
import { OrderModule } from 'ngx-order-pipe';
import { NgxSkeletonLoaderModule } from 'ngx-skeleton-loader';
import { AccionVerificacionComponent } from './components/ficha-tramite/detalle/accion-verificacion/accion-verificacion.component';
import { AccionPagoComponent } from './components/ficha-tramite/detalle/accion-pago/accion-pago.component';
import { AccionSolicitudComponent } from './components/ficha-tramite/detalle/accion-solicitud/accion-solicitud.component';
import { AccionDocumentoComponent } from './components/ficha-tramite/detalle/accion-documento/accion-documento.component';
import { AccionFormularioComponent } from './components/ficha-tramite/detalle/accion-formulario/accion-formulario.component';
import { AccionExcepcionComponent } from './components/ficha-tramite/detalle/accion-excepcion/accion-excepcion.component';
import { SeguimientoSolicitudComponent } from './components/ficha-tramite/detalle/seguimiento-solicitud/seguimiento-solicitud.component';

@NgModule({
  imports: [
    NgbModule,
    CommonModule,
    AvisoDeConstruccionModule,
    TramitesRoutingModule,
    AutocompleteLibModule,
    NgSelectModule,
    NgSelect2Module,
    NgxPaginationModule,
    CarouselModule,
    TransversalesModule,
    FormsModule,
    OrderModule,
    NgxSkeletonLoaderModule
  ],
  declarations: [
    TramitesHomeComponent,
    CodigosCiiuYTramitesComponent,
    BusquedaCodigosCiiuComponent,
    TablaCodigosCiiuComponent,
    ServiciosYTramitesBuscadorComponent,
    ServiciosYTramitesListComponent,
    CategoriasComponent,
    BannerCiiuComponent,
    DownloadComponent,
    VentanillasComponent,
    ModalVerNotaComponent,
    MensajeSinDatosCiiuComponent,
    GeneralComponent,
    FichaEspecificaComponent,
    FichaNoSuiteComponent,
    ModalAlertasComponent,
    LineaAvanceComponent,
    FichaespecificaHeaderComponent,
    FichaespecificaDetalleComponent,
    ConfirmModalComponent,
    BtnPuntosAtencionComponent,
    PuntosAtencionModalComponent,
    MapaModalComponent,
    ModalFechasDisponiblesComponent,
    BtnTramiteLineaComponent,
    TutorialesComponent,
    ModalTutorialesComponent,
    AyudaComponent,
    AtencionComponent,
    FichaespecificaAccordionComponent,
    FichaespecificaResultadoComponent,
    LegislacionAsociadaComponent,
    FichaespecificaFooterComponent,
    AccionVerificacionComponent,
    AccionPagoComponent,
    AccionSolicitudComponent,
    AccionDocumentoComponent,
    AccionFormularioComponent,
    AccionExcepcionComponent,
    SeguimientoSolicitudComponent
  ],
  exports: [TramitesHomeComponent],
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
})
export class TramitesModule { }
