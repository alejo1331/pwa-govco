import { NgModule,CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { GeneralIterceptorService } from './interceptors/general-iterceptor/general-iterceptor.service';
import { BrowserModule } from '@angular/platform-browser';
import { AppRoutingModule } from 'src/app/app-routing.module';

import { NoticiasRoutingModule } from './noticias-routing.module';
import { ListadoNoticiasComponent } from './components/listado-noticias/listado-noticias.component';
import { AvisoDeConstruccionModule } from '../aviso-de-construccion/aviso-de-construccion.module';
import { DetalleNoticiasComponent } from './components/detalle-noticias/detalle-noticias.component';
import { BreadCrumbComponent } from './shared/bread-crumb/bread-crumb.component';
import { WordLimitPipe } from './shared/pipe/word-limite.pipe';
import { PaginationComponent } from './shared/pagination/pagination.component';
import { ScrollToTopComponent } from './shared/scroll-to-top/scroll-to-top.component';
import { ValidarUrlDirective } from './shared/directives/validar-url/validar-url.directive';
import { OAuthModule } from 'angular-oauth2-oidc';



@NgModule({
  declarations: [
    ListadoNoticiasComponent,
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
    NoticiasRoutingModule,
    OAuthModule.forRoot({
      resourceServer: {
        allowedUrls: ['http://www.angular.at/api'],
        sendAccessToken: true
      }
    })
  ],
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
  exports: [
    ListadoNoticiasComponent,
    ValidarUrlDirective
  ]
})
export class NoticiasModule { }
