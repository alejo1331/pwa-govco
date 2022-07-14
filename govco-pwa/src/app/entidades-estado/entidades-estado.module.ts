import { CUSTOM_ELEMENTS_SCHEMA, NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { EntidadesEstadoRoutingModule } from './entidades-estado-routing.module';
import { EntidadesEstadoComponent } from './components/entidades-estado/entidades-estado.component';
import { AvisoDeConstruccionModule } from '../aviso-de-construccion/aviso-de-construccion.module';
import { CategoriasComponent } from './components/categorias/categorias.component';
import { ArticlesComponent } from './components/articles/articles.component';
import { HTTP_INTERCEPTORS } from '@angular/common/http';
import { GeneralIterceptorService } from './interceptors/general-interceptor/general-interceptor.service';
import { ModalAlertasComponent } from './modal-alertas/modal-alertas.component';


@NgModule({
  declarations: [
    EntidadesEstadoComponent,
    CategoriasComponent,
    ArticlesComponent,
    ModalAlertasComponent
  ],
  imports: [
    CommonModule,
    AvisoDeConstruccionModule,
    EntidadesEstadoRoutingModule
  ],
  exports: [
    EntidadesEstadoComponent
  ],
  providers: [
    { provide: HTTP_INTERCEPTORS, useClass: GeneralIterceptorService, multi: true }
  ],
  schemas:[CUSTOM_ELEMENTS_SCHEMA]
})
export class EntidadesEstadoModule { }
