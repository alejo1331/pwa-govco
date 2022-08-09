import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { BibliotecaRoutingModule } from './biblioteca-routing.module';
import { HomeComponent } from './components/home/home.component';
import { CategoriasComponent } from './components/categorias/categorias.component';
import { ResultadosComponent } from './components/resultados/resultados.component';
import { RecursosComponent } from './components/recursos/recursos.component';
import { SharedModule } from './shared/shared.module';
import { SafePipe } from './pipes/safe.pipe';
import { SearchPipe } from './pipes/search.pipe';
import { WordLimitPipe } from './pipes/word-limit.pipe';


@NgModule({
  declarations: [
    // HomeComponent,
    CategoriasComponent,
    ResultadosComponent,
    RecursosComponent,
    SafePipe, 
    SearchPipe, 
    WordLimitPipe
  ],
  imports: [
    CommonModule,
    BibliotecaRoutingModule
    // SharedModule
  ],
  exports: [SearchPipe, WordLimitPipe]
})
export class BibliotecaModule { }
