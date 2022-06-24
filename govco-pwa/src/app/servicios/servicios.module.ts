import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ServiciosRoutingModule } from './servicios-routing.module';
import { ServiciosHomeComponent } from './components/servicios-home/servicios-home.component';


@NgModule({
  imports: [
    CommonModule,
    ServiciosRoutingModule
  ],
  declarations: [ServiciosHomeComponent],
  exports: [ServiciosHomeComponent],
})
export class ServiciosModule { }
