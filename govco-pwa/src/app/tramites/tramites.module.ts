import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TramitesHomeComponent } from './components/tramites-home//tramites-home.component';
import { TramitesRoutingModule } from './tramites-routing.module';
import { AvisoDeConstruccionModule } from '../aviso-de-construccion/aviso-de-construccion.module';
import { CodigosCiiuYTramitesComponent } from './components/codigos-ciiu-y-tramites/codigos-ciiu-y-tramites.component';
import { BusquedaCodigosCiiuComponent } from './components/codigos-ciiu-y-tramites/busqueda-codigos-ciiu/busqueda-codigos-ciiu.component';
import {AutocompleteLibModule} from 'angular-ng-autocomplete';
import { NgSelectModule } from 'ng-custom-select';
import { NgSelect2Module } from 'ng-select2';

@NgModule({
  imports: [
    CommonModule,
    AvisoDeConstruccionModule,
    TramitesRoutingModule,
    AutocompleteLibModule,
    NgSelectModule,
    NgSelect2Module
  ],
  declarations: [
    TramitesHomeComponent,
    CodigosCiiuYTramitesComponent,
    BusquedaCodigosCiiuComponent,
  ],
  exports: [TramitesHomeComponent],
  schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class TramitesModule { }
