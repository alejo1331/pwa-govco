import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { HomePwaRoutingModule } from './home-pwa-routing.module';
import { HomePrincipalComponent } from './components/home-principal/home-principal.component';
import { NoticiasPwaModule } from './components/noticias-pwa/noticias-pwa.module';


@NgModule({
  declarations: [
    HomePrincipalComponent
  ],
  imports: [
    CommonModule,
    HomePwaRoutingModule,
    NoticiasPwaModule
  ]
})
export class HomePwaModule { }
