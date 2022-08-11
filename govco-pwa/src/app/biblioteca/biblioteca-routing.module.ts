import { NgModule } from '@angular/core';
import { ExtraOptions, RouterModule, Routes } from '@angular/router';
import { CategoriasComponent } from './components/categorias/categorias.component';
import { BibliotecaComponent } from './components/home/biblioteca.component';
import { RecursosComponent } from './components/recursos/recursos.component';
import { ResultadosComponent } from './components/resultados/resultados.component';

const routerOptions: ExtraOptions = {
  useHash: false,
  scrollPositionRestoration: 'enabled',
  anchorScrolling: 'enabled',
  scrollOffset: [0, 64]
};

const routes: Routes = [{
  path: 'biblioteca',
  children: [
    { path: '', component: BibliotecaComponent },
    { path: 'categoria/:categoria/:id', component: CategoriasComponent },
    { path: 'recurso/:nivel1/:nivel2/:nivel/:recurso', component: RecursosComponent },
    { path: 'recurso/:nivel1/:nivel2/:nivel3/:nivel/:recurso', component: RecursosComponent },
    { path: 'resultados', component: ResultadosComponent, pathMatch: 'prefix' },
  ]
}];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class BibliotecaRoutingModule { }
