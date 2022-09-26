import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { TramitesPrincipalComponent } from './components/tramites-principal/tramites-principal.component';

const routes: Routes = [
  {
    path: 'ficha-tramites-y-servicios-pwa',
    children: [
      {
        path: '',
        component: TramitesPrincipalComponent
      }
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class TramitesPwaRoutingModule { }
