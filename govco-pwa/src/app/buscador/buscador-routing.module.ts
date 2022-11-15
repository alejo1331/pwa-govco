import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { BuscadorGeneralComponent } from './components/govco-buscador-general/govco-buscador-general.component';


const routes: Routes = [
  {
    path: 'buscador-old',
    children: [
      {
        path: '',
        component: BuscadorGeneralComponent
      },
      {
        path: ':busqueda',
        component: BuscadorGeneralComponent

      },
    ]
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class BuscadorRoutingModule { }
