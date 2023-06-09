import { CUSTOM_ELEMENTS_SCHEMA, NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { SobreNosotrosRoutingModule } from './sobre-nosotros-routing.module';
import { SobreNosotrosComponent } from './components/sobre-nosotros/sobre-nosotros.component';
import { AvisoDeConstruccionModule } from '../aviso-de-construccion/aviso-de-construccion.module';
import { SobreNosotrosLineaDeTiempoComponent } from './components/sobre-nosotros-linea-de-tiempo/sobre-nosotros-linea-de-tiempo.component';
import { SharedModule } from './shared/shared.module';
import { TransversalesModule } from '../transversales/transversales.module';




@NgModule({
  declarations: [
    SobreNosotrosComponent,
    SobreNosotrosLineaDeTiempoComponent
  ],
  imports: [
    CommonModule,
    AvisoDeConstruccionModule,
    SobreNosotrosRoutingModule,
    SharedModule,
    TransversalesModule
  ],
  exports: [
    SobreNosotrosComponent
  ],
  schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class SobreNosotrosModule { }
