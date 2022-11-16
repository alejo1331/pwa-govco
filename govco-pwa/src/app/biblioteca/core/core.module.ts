
import { CommonModule } from '@angular/common';
import { TemplateComponent } from './template/template.component';
import { LoadingService } from '../shared/loading/services/loading.service';
import { HeaderBibliotecaService } from '../services/header-service/header-biblioteca-service.service';
import { SidebarComponent } from './template/components/sidebar/sidebar.component';
import { FormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { MainComponent } from './template/components/main/main.component';
import { CUSTOM_ELEMENTS_SCHEMA, NgModule } from '@angular/core'; 
import { InteresComponent } from './template/components/interes/interes.component';
import { SharedModule } from '../shared/shared.module';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { BuscadorBibliotecaComponent } from './template/components/buscador/buscador-biblioteca.component';

@NgModule({
  declarations: [
    TemplateComponent,
    SidebarComponent,
    MainComponent,
    InteresComponent,
    BuscadorBibliotecaComponent
  ],
  imports: [
    CommonModule,
    FormsModule,
    RouterModule,
    NgbModule,
    SharedModule
  ],
  exports: [
    TemplateComponent
  ],
  providers: [
    HeaderBibliotecaService,
    LoadingService
  ],
  schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class CoreModule { }