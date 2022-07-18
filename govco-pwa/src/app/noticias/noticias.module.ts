import { NgModule,CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { GeneralIterceptorService } from './interceptors/general-iterceptor/general-iterceptor.service';
import { BrowserModule } from '@angular/platform-browser';
import { AppRoutingModule } from 'src/app/app-routing.module';

import { NoticiasRoutingModule } from './noticias-routing.module';
import { NoticiasComponent } from './components/noticias/noticias.component';
import { AvisoDeConstruccionModule } from '../aviso-de-construccion/aviso-de-construccion.module';
import { DetalleNoticiasComponent } from './components/detalle-noticias/detalle-noticias.component';
import { BreadCrumbComponent } from './shared/bread-crumb/bread-crumb.component';
import { WordLimitPipe } from './shared/pipe/word-limite.pipe';
import { PaginationComponent } from './shared/pagination/pagination.component';
import { ScrollToTopComponent } from './shared/scroll-to-top/scroll-to-top.component';
import { ValidarUrlDirective } from './shared/directives/validar-url/validar-url.directive';



@NgModule({
  declarations: [
    NoticiasComponent,
    DetalleNoticiasComponent,
    BreadCrumbComponent,
    PaginationComponent,
    ScrollToTopComponent,
    ValidarUrlDirective,
    WordLimitPipe
  ],
  providers: [
    { provide: HTTP_INTERCEPTORS, useClass: GeneralIterceptorService, multi: true }
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    CommonModule,
    AvisoDeConstruccionModule,
    NoticiasRoutingModule
  ],
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
  exports: [
    NoticiasComponent,
    ValidarUrlDirective
  ]
})
export class NoticiasModule { }
