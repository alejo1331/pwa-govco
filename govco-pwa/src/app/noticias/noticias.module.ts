import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { NoticiasRoutingModule } from './noticias-routing.module';
import { NoticiasComponent } from './components/noticias/noticias.component';
import { AvisoDeConstruccionModule } from '../aviso-de-construccion/aviso-de-construccion.module';


@NgModule({
  declarations: [
    NoticiasComponent
  ],
  imports: [
    CommonModule,
    AvisoDeConstruccionModule,
    NoticiasRoutingModule
  ],
  exports: [
    NoticiasComponent
  ]
})
export class NoticiasModule { }
