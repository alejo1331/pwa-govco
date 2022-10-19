import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { FiltrosPrincipalComponent } from './components/filtros-principal/filtros-principal.component';

const routes: Routes = [  
  {
    path: 'filtros-pwa',
    component: FiltrosPrincipalComponent
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class BuscadorPwaRoutingModule { }
