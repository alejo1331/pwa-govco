import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RegistroComponent } from './components/registro/registro.component';
import { AvisoDeConstruccionModule } from '../aviso-de-construccion/aviso-de-construccion.module';
import { RegistroRoutingModule } from './registro-routing.module';



@NgModule({
  imports: [
    CommonModule,
    AvisoDeConstruccionModule,
    RegistroRoutingModule
  ],
  declarations: [RegistroComponent],
  exports: [RegistroComponent],
})
export class RegistroModule { }
