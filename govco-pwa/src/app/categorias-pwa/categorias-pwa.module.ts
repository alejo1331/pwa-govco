import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { CategoriasPwaRoutingModule } from './categorias-pwa-routing.module';
import { MomentosDeVidaComponent } from './components/momentos-de-vida/momentos-de-vida.component';
import { DetalleMomentosDeVidaComponent } from './components/detalle-momentos-de-vida/detalle-momentos-de-vida.component';


@NgModule({
  declarations: [
    MomentosDeVidaComponent,
    DetalleMomentosDeVidaComponent
  ],
  imports: [
    CommonModule,
    CategoriasPwaRoutingModule
  ]
})
export class CategoriasPwaModule { }
