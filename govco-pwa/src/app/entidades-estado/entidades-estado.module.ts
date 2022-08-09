import { CUSTOM_ELEMENTS_SCHEMA, NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { EntidadesEstadoRoutingModule } from './entidades-estado-routing.module';
import { EntidadesEstadoComponent } from './components/entidades-estado/entidades-estado.component';
import { AvisoDeConstruccionModule } from '../aviso-de-construccion/aviso-de-construccion.module';
import { SharedModule } from './shared/shared.module';


@NgModule({
  declarations: [
    EntidadesEstadoComponent
  ],
  imports: [
    CommonModule,
    AvisoDeConstruccionModule,
    EntidadesEstadoRoutingModule,
    SharedModule
  ],
  exports: [
    EntidadesEstadoComponent
  ],
  schemas:[CUSTOM_ELEMENTS_SCHEMA]
})
export class EntidadesEstadoModule { }
