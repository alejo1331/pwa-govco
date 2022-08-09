import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { BannerPrincipalComponent } from './banner-principal/banner-principal.component';
import { BreadcumbsComponent } from './breadcumbs/breadcumbs.component';



@NgModule({
  declarations: [BannerPrincipalComponent, BreadcumbsComponent],
  imports: [
    CommonModule
  ],
  exports: [BannerPrincipalComponent, BreadcumbsComponent]
})
export class SharedModule { }
