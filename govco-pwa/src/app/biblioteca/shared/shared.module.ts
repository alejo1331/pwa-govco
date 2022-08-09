import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SafePipe } from '../pipes/safe.pipe';
import { ModalComponent } from './modal/modal.component';
import { NgbModalModule, NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { FormsModule } from '@angular/forms';
import { HomeComponent } from '../components/home/home.component';
import { SearchPipe } from '../pipes/search.pipe';
import { RouterModule } from '@angular/router';
import { CategoriasComponent } from '../components/categorias/categorias.component';
import { RecursosComponent } from '../components/recursos/recursos.component';
import { CategoriasService } from '../services/categorias-service/categorias-service.service';
import { ResultadosComponent } from '../components/resultados/resultados.component';
import { BuscadorService } from '../services/buscador-service/buscador-service.service';
import { DatepickerFormat } from './datepicker-format/datepicket-format'
import { NgbDateParserFormatter } from '@ng-bootstrap/ng-bootstrap';
import { WordLimitPipe } from '../pipes/word-limit.pipe';
import { GlobalConstants } from '../common/global-constants';
import { LoadingComponent } from './loading/components/loading/loading.component';

@NgModule({
  declarations: [ModalComponent, LoadingComponent],
  imports: [
    CommonModule,
    NgbModalModule, 
    NgbModule,
    FormsModule,
    RouterModule
  ],
  providers: [ModalComponent,CategoriasService, BuscadorService, { provide: NgbDateParserFormatter, useClass: DatepickerFormat }, GlobalConstants],
  entryComponents: [ModalComponent],
  exports: [ SearchPipe, WordLimitPipe, LoadingComponent]
})
export class SharedModule { }
