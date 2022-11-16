import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ModalComponent } from './modal/modal.component';
import { SafePipe } from '../pipes/safe.pipe';
import { SearchPipe } from '../pipes/search.pipe';
import { CategoriasComponent } from '../components/categorias/categorias.component';
import { RecursosComponent } from '../components/recursos/recursos.component';
import { ResultadosComponent } from '../components/resultados/resultados.component';
import { WordLimitPipe } from '../pipes/word-limit.pipe';
import { LoadingComponent } from './loading/components/loading/loading.component';
import { NgbDateParserFormatter, NgbModalModule } from '@ng-bootstrap/ng-bootstrap';
import { FormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { CategoriasService } from '../services/categorias-service/categorias-service.service';
import { BuscadorService } from '../services/buscador-service/buscador-service.service';
import { DatepickerFormat } from './datepicker-format/datepicket-format';
import { GlobalConstants } from '../common/global-constants';
import { BibliotecaComponent } from '../components/home/biblioteca.component';



@NgModule({
  declarations: [ModalComponent, BibliotecaComponent, SafePipe, SearchPipe, CategoriasComponent, RecursosComponent, ResultadosComponent, WordLimitPipe, LoadingComponent],
  imports: [
    CommonModule,
    NgbModalModule, 
    FormsModule,
    RouterModule
  ],
  providers: [ModalComponent,CategoriasService, BuscadorService, { provide: NgbDateParserFormatter, useClass: DatepickerFormat }, GlobalConstants],
  entryComponents: [ModalComponent],
  exports: [BibliotecaComponent, SearchPipe, WordLimitPipe, LoadingComponent]
})
export class SharedModule { }
