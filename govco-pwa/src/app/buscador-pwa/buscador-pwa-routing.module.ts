import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { urlsLocal } from 'src/variables-globales/urlsLocal';
import { BuscadorPrincipalComponent } from './components/buscador-principal/buscador-principal.component';

const routes: Routes = [
  {
    path: urlsLocal.buscador,
    component: BuscadorPrincipalComponent
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class BuscadorPwaRoutingModule { }
