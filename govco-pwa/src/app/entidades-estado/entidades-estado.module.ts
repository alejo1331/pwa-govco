import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { EntidadesEstadoRoutingModule } from './entidades-estado-routing.module';
import { EntidadesEstadoComponent } from './components/entidades-estado/entidades-estado.component';


@NgModule({
  declarations: [
    EntidadesEstadoComponent
  ],
  imports: [
    CommonModule,
    EntidadesEstadoRoutingModule
  ],
  exports: [
    EntidadesEstadoComponent
  ]
})
export class EntidadesEstadoModule { }
