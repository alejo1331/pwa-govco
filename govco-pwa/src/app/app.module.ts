import { NgModule, CUSTOM_ELEMENTS_SCHEMA, LOCALE_ID } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { HttpClientModule} from '@angular/common/http';
import es from '@angular/common/locales/es';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { ServiceWorkerModule } from '@angular/service-worker';
import { environment } from '../environments/environment';
import { InicioModule } from './inicio/inicio.module';
import { PerfilModule } from './perfil/perfil.module';
import { TramitesModule } from './tramites/tramites.module';
import { ServiciosModule } from './servicios/servicios.module';
import { TransversalesModule } from './transversales/transversales.module';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MatSidenavModule } from '@angular/material/sidenav';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { SidenavModule  } from './sidenav/sidenav.module';
import { SidenavService } from './transversales/services/sidenav-service/sidenav-service.service';
import { NoticiasModule } from './noticias/noticias.module';
import { EntidadesEstadoModule } from './entidades-estado/entidades-estado.module';
import { SobreNosotrosModule } from './sobre-nosotros/sobre-nosotros.module';
import { AvisoDeConstruccionModule } from './aviso-de-construccion/aviso-de-construccion.module';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { BuscadorModule } from './buscador/buscador.module';
import {PlatformModule} from '@angular/cdk/platform';
import { ParticipaModule } from './participa/components/participa/Participa.Module';
import { registerLocaleData } from '@angular/common';
import { BibliotecaModule } from './biblioteca/biblioteca.module';
import { CategoriasModule } from './categorias/categorias.module';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { RecaptchaModule } from "ng-recaptcha";


registerLocaleData(es)

@NgModule({
  declarations: [
    AppComponent
  ],

  imports: [
    BrowserModule,
    HttpClientModule,
    MatSidenavModule,
    MatToolbarModule,
    MatButtonModule,
    MatIconModule,
    AppRoutingModule,
    SidenavModule,
    InicioModule,
    PerfilModule,
    TramitesModule,
    ServiciosModule,
    TransversalesModule,
    PlatformModule,
    FormsModule,
    ReactiveFormsModule,
    RecaptchaModule,
    ServiceWorkerModule.register('ngsw-worker.js', {
      enabled: environment.production,
      // Register the ServiceWorker as soon as the application is stable
      // or after 30 seconds (whichever comes first).
      registrationStrategy: 'registerWhenStable:30000'
    }),
    BrowserAnimationsModule,
    NoticiasModule,
    ParticipaModule,
    EntidadesEstadoModule,
    SobreNosotrosModule,
    AvisoDeConstruccionModule,
    NgbModule,
    BuscadorModule,
    BibliotecaModule,
    CategoriasModule
  ],
  providers: [
    SidenavService,
    {provide: LOCALE_ID, useValue: 'es-ES'}
  ],
  bootstrap: [AppComponent],
  schemas: [CUSTOM_ELEMENTS_SCHEMA]

})
export class AppModule { }
