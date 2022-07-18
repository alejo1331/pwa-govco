import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { BuscadorHomeComponent } from './components/govco-buscador-home/govco-buscador-home.component';
import { BuscadorGeneralComponent } from './components/govco-buscador-general/govco-buscador-general.component';


const routes: Routes = [
  {
    path: 'buscador',
    children: [
      {
        path: 'home',
        component: BuscadorHomeComponent
      },
      {
        path: 'general',
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
