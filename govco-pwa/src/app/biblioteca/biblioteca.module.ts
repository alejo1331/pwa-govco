import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { BibliotecaRoutingModule } from './biblioteca-routing.module';
import { HomeComponent } from './components/home/home.component';
import { CategoriasComponent } from './components/categorias/categorias.component';
import { ResultadosComponent } from './components/resultados/resultados.component';
import { RecursosComponent } from './components/recursos/recursos.component';
import { SearchPipe } from './pipes/search.pipe';


@NgModule({
  declarations: [
    HomeComponent,
    CategoriasComponent,
    ResultadosComponent,
    RecursosComponent,
    search
  ],
  imports: [
    CommonModule,
    BibliotecaRoutingModule
  ]
})
export class BibliotecaModule { }
