import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { SobreNosotrosRoutingModule } from './sobre-nosotros-routing.module';
import { SobreNosotrosComponent } from './components/sobre-nosotros/sobre-nosotros.component';
import { AvisoDeConstruccionModule } from '../aviso-de-construccion/aviso-de-construccion.module';




@NgModule({
  declarations: [
    SobreNosotrosComponent
  ],
  imports: [
    CommonModule,
    AvisoDeConstruccionModule,
    SobreNosotrosRoutingModule,
  ],
  exports: [
    SobreNosotrosComponent
  ]
})
export class SobreNosotrosModule { }
