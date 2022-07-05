import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { PerfilRoutingModule } from  './perfil-routing.module';
import { PerfilHomeComponent } from './components/perfil-home/perfil-home.component';
import { AvisoDeConstruccionModule } from '../aviso-de-construccion/aviso-de-construccion.module';

@NgModule({
  imports: [
    CommonModule,
    AvisoDeConstruccionModule,
    PerfilRoutingModule
  ],
  declarations: [PerfilHomeComponent],
  exports: [PerfilHomeComponent],
})
export class PerfilModule { }
