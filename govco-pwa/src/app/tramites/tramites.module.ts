import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
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
import { ModalVerNotaComponent } from './components/codigos-ciiu-y-tramites/modal-ver-nota/modal-ver-nota.component';
import { MensajeSinDatosCiiuComponent } from './components/codigos-ciiu-y-tramites/mensaje-sin-datos-ciiu/mensaje-sin-datos-ciiu.component';

@NgModule({
  imports: [
    CommonModule,
    AvisoDeConstruccionModule,
    TramitesRoutingModule,
    AutocompleteLibModule,
    NgSelectModule,
    NgSelect2Module,
    NgxPaginationModule,
  ],
  declarations: [
    TramitesHomeComponent,
    CodigosCiiuYTramitesComponent,
    BusquedaCodigosCiiuComponent,
    TablaCodigosCiiuComponent,
    ModalVerNotaComponent,
    MensajeSinDatosCiiuComponent,
  ],
  exports: [TramitesHomeComponent],
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
})
export class TramitesModule { }
