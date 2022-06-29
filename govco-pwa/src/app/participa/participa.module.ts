import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ParticipaRoutingModule } from './participa-routing.module';
import { ParticipaComponent } from './components/participa/participa.component';
import { AvisoDeConstruccionModule } from '../aviso-de-construccion/aviso-de-construccion.module';


@NgModule({
  declarations: [
    ParticipaComponent
  ],
  imports: [
    CommonModule,
    AvisoDeConstruccionModule,
    ParticipaRoutingModule
  ],
  exports: [
    ParticipaComponent
  ]
})
export class ParticipaModule { }
