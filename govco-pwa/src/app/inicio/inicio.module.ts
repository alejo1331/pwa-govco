import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HomeComponent } from './home/home.component';
import { InicioRoutingModule } from './inicio-routing.module';
import { AvisoDeConstruccionModule } from '../aviso-de-construccion/aviso-de-construccion.module';

@NgModule({
  imports: [
    CommonModule,
    AvisoDeConstruccionModule,
    InicioRoutingModule
  ],
  declarations: [HomeComponent],
  exports: [HomeComponent],
})
export class InicioModule { }
