import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { BibliotecaRoutingModule } from './biblioteca-routing.module';
import { BibliotecaComponent } from './components/home/biblioteca.component';
import { CategoriasComponent } from './components/categorias/categorias.component';
import { ResultadosComponent } from './components/resultados/resultados.component';
import { RecursosComponent } from './components/recursos/recursos.component';
import { SafePipe } from './pipes/safe.pipe';
import { SearchPipe } from './pipes/search.pipe';
import { WordLimitPipe } from './pipes/word-limit.pipe';
import { ModalComponent } from './shared/modal/modal.component';
import { LoadingComponent } from './shared/loading/components/loading/loading.component';
import { NgbDateParserFormatter, NgbModalModule, NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { FormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { CategoriasService } from './services/categorias-service/categorias-service.service';
import { BuscadorService } from './services/buscador-service/buscador-service.service';
import { DatepickerFormat } from './shared/datepicker-format/datepicket-format';
import { GlobalConstants } from './common/global-constants';


@NgModule({
  declarations: [
    ModalComponent,
    BibliotecaComponent,
    CategoriasComponent,
    ResultadosComponent,
    RecursosComponent,
    LoadingComponent,
    SafePipe, 
    SearchPipe, 
    WordLimitPipe
  ],
  imports: [
    BibliotecaRoutingModule,
    CommonModule,
    NgbModalModule, 
    NgbModule,
    FormsModule,
    RouterModule
  ],
  providers: [ModalComponent,CategoriasService, BuscadorService, { provide: NgbDateParserFormatter, useClass: DatepickerFormat }, GlobalConstants],
  entryComponents: [ModalComponent],
  exports: [BibliotecaComponent,SearchPipe, WordLimitPipe, LoadingComponent]
})
export class BibliotecaModule { }
