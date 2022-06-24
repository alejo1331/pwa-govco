import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ParticipaRoutingModule } from './participa-routing.module';
import { ParticipaComponent } from './components/participa/participa.component';


@NgModule({
  declarations: [
    ParticipaComponent
  ],
  imports: [
    CommonModule,
    ParticipaRoutingModule
  ],
  exports: [
    ParticipaComponent
  ]
})
export class ParticipaModule { }
