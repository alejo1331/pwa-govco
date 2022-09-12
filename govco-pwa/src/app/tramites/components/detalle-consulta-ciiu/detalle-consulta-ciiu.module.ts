import { NgModule, CUSTOM_ELEMENTS_SCHEMA  } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { DetalleConsultaCiiuRoutingModule } from './detalle-consulta-ciiu-routing.module';
import { DetalleConsultaCiiuComponent } from './components/detalle-consulta-ciiu/detalle-consulta-ciiu.component';
import { AvisoCiiuComponent } from './components/aviso-ciiu/aviso-ciiu.component';
import { PaginadorTramitesObligatoriosComponent } from './components/paginador-tramites-obligatorios/paginador-tramites-obligatorios.component';
import { TramitesObligatoriosCiiuComponent } from './components/tramites-obligatorios-ciiu/tramites-obligatorios-ciiu.component';
import { PreguntasCondicionantesCiiuComponent } from './components/preguntas-condicionantes-ciiu/preguntas-condicionantes-ciiu.component';
import { TramitesCondicionantesCiiuComponent } from './components/tramites-condicionantes-ciiu/tramites-condicionantes-ciiu.component';
import { NotaLegalCiiuComponent } from './components/nota-legal-ciiu/nota-legal-ciiu.component';
import { ConfirmModalComponent } from './components/confirm-modal/confirm-modal.component';
import { BreadCrumbComponent } from './components/bread-crumb/bread-crumb.component';
import { WordLimitPipe } from '../../pipes/word-limit/word-limit.pipe';




@NgModule({
  declarations: [
    DetalleConsultaCiiuComponent,
    AvisoCiiuComponent,
    PaginadorTramitesObligatoriosComponent,
    TramitesObligatoriosCiiuComponent,
    PreguntasCondicionantesCiiuComponent,
    TramitesCondicionantesCiiuComponent,
    NotaLegalCiiuComponent,
    // ConfirmModalComponent,
    // BreadCrumbComponent,
    // WordLimitPipe,
  ],
  imports: [
    CommonModule,
    DetalleConsultaCiiuRoutingModule,
    NgbModule
  ],
  schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class DetalleConsultaCiiuModule { }
