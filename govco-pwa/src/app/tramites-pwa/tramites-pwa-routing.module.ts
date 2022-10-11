import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { TramitesIdComponent } from './components/tramites-principal/tramites-id.component';

const routes: Routes = [
  {
    path: 'ficha-tramites-y-servicios-pwa',
    children: [
      {
        path: ':id',
        component: TramitesIdComponent
      }
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class TramitesPwaRoutingModule { }
