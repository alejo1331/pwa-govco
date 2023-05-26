import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { CategoriasPwaRoutingModule } from './categorias-pwa-routing.module';
import { MomentosDeVidaComponent } from './components/momentos-de-vida/momentos-de-vida.component';
import { DetalleMomentosDeVidaComponent } from './components/detalle-momentos-de-vida/detalle-momentos-de-vida.component';
import { BibliotecaPwaModule } from '../biblioteca-pwa/biblioteca-pwa.module';
import { LoMasConsultadoComponent } from './components/lo-mas-consultado/lo-mas-consultado.component';


@NgModule({
  declarations: [
    MomentosDeVidaComponent,
    DetalleMomentosDeVidaComponent,
    LoMasConsultadoComponent
  ],
  imports: [
    CommonModule,
    CategoriasPwaRoutingModule,
    BibliotecaPwaModule,
  ]
})
export class CategoriasPwaModule { }
