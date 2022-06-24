import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HomeComponent } from './home/home.component';
import { InicioRoutingModule } from './inicio-routing.module';
import { TransversalesModule } from '../transversales/transversales.module';

@NgModule({
  imports: [
    CommonModule,
    InicioRoutingModule,
    TransversalesModule
  ],
  declarations: [HomeComponent],
  exports: [HomeComponent],
})
export class InicioModule { }
