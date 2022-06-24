import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { SobreNosotrosRoutingModule } from './sobre-nosotros-routing.module';
import { SobreNosotrosComponent } from './components/sobre-nosotros/sobre-nosotros.component';


@NgModule({
  declarations: [
    SobreNosotrosComponent
  ],
  imports: [
    CommonModule,
    SobreNosotrosRoutingModule
  ],
  exports: [
    SobreNosotrosComponent
  ]
})
export class SobreNosotrosModule { }
