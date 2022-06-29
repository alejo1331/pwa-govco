import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { AvisoDeConstruccionRoutingModule } from './aviso-de-construccion-routing.module';
import { AvisoDeConstruccionComponent } from './aviso-de-construccion/aviso-de-construccion.component';

@NgModule({
  declarations: [
    AvisoDeConstruccionComponent
  ],
  imports: [
    CommonModule,
    AvisoDeConstruccionRoutingModule
  ],
  exports: [
    AvisoDeConstruccionComponent
  ]
})
export class AvisoDeConstruccionModule { }
