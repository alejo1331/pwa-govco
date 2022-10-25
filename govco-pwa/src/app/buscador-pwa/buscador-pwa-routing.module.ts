import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { BuscadorNivelDosComponent } from './buscador-nivel-dos/buscador-nivel-dos.component';
import { BuscadorPrincipalComponent } from './components/buscador-principal/buscador-principal.component';
import { FiltrosPrincipalComponent } from './components/filtros-principal/filtros-principal.component';

const routes: Routes = [
  {
    path: 'filtros-pwa',
    component: FiltrosPrincipalComponent
  },
  {
    path: 'buscar-pwa',
    component: BuscadorPrincipalComponent
  },
  {
    path: 'buscar-nivel-dos-pwa',
    component: BuscadorNivelDosComponent
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class BuscadorPwaRoutingModule { }
