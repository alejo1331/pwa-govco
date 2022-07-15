import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { BreadCrumbComponent } from './bread-crumb/components/bread-crumb/bread-crumb.component';
import { RouterModule } from '@angular/router';
import { ValidarUrlDirective } from './directives/validar-url/validar-url.directive';



@NgModule({
  declarations: [BreadCrumbComponent, ValidarUrlDirective],
  imports: [
    CommonModule,
    RouterModule
  ],
  exports: [BreadCrumbComponent, ValidarUrlDirective]
})
export class SharedModule { }
