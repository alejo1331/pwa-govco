import { NgModule,CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { GeneralIterceptorService } from './interceptors/general-iterceptor/general-iterceptor.service';
import { BrowserModule } from '@angular/platform-browser';
import { AppRoutingModule } from 'src/app/app-routing.module';
import { BibliotecaPwaModule } from '../biblioteca-pwa/biblioteca-pwa.module';
import { NoticiasRoutingModule } from './noticias-routing.module';
import { ListadoNoticiasComponent } from './components/listado-noticias/listado-noticias.component';
import { AvisoDeConstruccionModule } from '../aviso-de-construccion/aviso-de-construccion.module';
import { DetalleNoticiasComponent } from './components/detalle-noticias/detalle-noticias.component';
import { BreadCrumbComponent } from './shared/bread-crumb/bread-crumb.component';
import { WordLimitPipe } from './shared/pipe/word-limite.pipe';
import { PaginationComponent } from './shared/pagination/pagination.component';
import { ScrollToTopComponent } from './shared/scroll-to-top/scroll-to-top.component';
import { OAuthModule } from 'angular-oauth2-oidc';
import { ActualidadPrincipalComponent } from './components/actualidad-principal/actualidad-principal.component';
import { ListadoNoticiasFiltroComponent } from './components/listado-noticias-filtro/listado-noticias-filtro.component';
import { SinResultadosNoticiasComponent } from './components/sin-resultados-noticias/sin-resultados-noticias.component';
import { BannerPrincipalComponent } from './shared/banner-principal/banner-principal.component';
import { BreadcumbsComponent } from './shared/breadcumbs/breadcumbs.component';

@NgModule({
  declarations: [
    ListadoNoticiasComponent,
    DetalleNoticiasComponent,
    ActualidadPrincipalComponent,
    ListadoNoticiasFiltroComponent,
    SinResultadosNoticiasComponent,
    BreadCrumbComponent,
    PaginationComponent,
    ScrollToTopComponent,
    WordLimitPipe,
    BannerPrincipalComponent,
    BreadcumbsComponent
  ],
  providers: [
    { provide: HTTP_INTERCEPTORS, useClass: GeneralIterceptorService, multi: true }
  ],
  imports: [
    BibliotecaPwaModule,
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
    ListadoNoticiasComponent
  ]
})
export class NoticiasModule { }
