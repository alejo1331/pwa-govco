import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { NoticiasPwaRoutingModule } from './noticias-pwa-routing.module';
import { ListadoNoticiasComponent } from './components/listado-noticias/listado-noticias.component';
import { BibliotecaPwaModule } from '../biblioteca-pwa/biblioteca-pwa.module';


@NgModule({
  declarations: [
    ListadoNoticiasComponent
  ],
  imports: [
    CommonModule,
    NoticiasPwaRoutingModule,
    BibliotecaPwaModule
  ]
})
export class NoticiasPwaModule { }
