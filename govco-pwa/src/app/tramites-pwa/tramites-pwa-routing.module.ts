import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { PuntosDeAtencionComponent } from './components/puntos-de-atencion/puntos-de-atencion.component';
import { TramitesIdComponent } from './components/tramites-principal/tramites-id.component';

const routes: Routes = [
  {
    path: 'ficha-tramites-y-servicios-pwa',
    children: [
      {
        path: ':id',
        component: TramitesIdComponent
      },
      {
        path: '',
        component: PuntosDeAtencionComponent
      }
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class TramitesPwaRoutingModule { }
