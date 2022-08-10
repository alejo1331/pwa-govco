import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { BreadcumbsComponent } from './breadcumbs/breadcumbs.component';



@NgModule({
  declarations: [
    BreadcumbsComponent
  ],
  imports: [
    CommonModule
  ],
  exports: [BreadcumbsComponent]
})
export class SharedModule { }
