import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { BreadCrumbComponent } from './bread-crumb/components/bread-crumb/bread-crumb.component';

import { RouterModule } from '@angular/router';
import { BannerPrincipalComponent } from './banner-principal/banner-principal.component';
import { BreadcumbsComponent } from './breadcumbs/breadcumbs.component';
import { WordLimitPipe } from './pipes/word-limite.pipe';





@NgModule({
  declarations: [BreadCrumbComponent,BannerPrincipalComponent,BreadcumbsComponent,WordLimitPipe],
  imports: [
    CommonModule,
    RouterModule
  ],
  exports: [BreadCrumbComponent,BannerPrincipalComponent,BreadcumbsComponent]
})
export class SharedModule { }
