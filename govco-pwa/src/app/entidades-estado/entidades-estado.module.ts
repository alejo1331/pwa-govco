import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { EntidadesEstadoRoutingModule } from './entidades-estado-routing.module';
import { EntidadesEstadoComponent } from './components/entidades-estado/entidades-estado.component';
import { AvisoDeConstruccionModule } from '../aviso-de-construccion/aviso-de-construccion.module';


@NgModule({
  declarations: [
    EntidadesEstadoComponent
  ],
  imports: [
    CommonModule,
    AvisoDeConstruccionModule,
    EntidadesEstadoRoutingModule
  ],
  exports: [
    EntidadesEstadoComponent
  ]
})
export class EntidadesEstadoModule { }
