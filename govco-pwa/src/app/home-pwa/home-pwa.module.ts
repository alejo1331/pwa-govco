import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { HomePwaRoutingModule } from './home-pwa-routing.module';
import { HomePrincipalComponent } from './components/home-principal/home-principal.component';
import { SeccionActualidadComponent } from './components/seccion-actualidad/seccion-actualidad.component';
import { BibliotecaPwaModule } from '../biblioteca-pwa/biblioteca-pwa.module';
import { SeccionTemasInteresComponent } from './components/seccion-temas-interes/seccion-temas-interes.component';


@NgModule({
  declarations: [
    HomePrincipalComponent,
    SeccionActualidadComponent,
    SeccionTemasInteresComponent
  ],
  imports: [
    CommonModule,
    HomePwaRoutingModule,
    BibliotecaPwaModule
  ]
})
export class HomePwaModule { }
