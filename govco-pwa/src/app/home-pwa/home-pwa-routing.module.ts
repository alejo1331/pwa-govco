import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { NivelTresComponent } from '../biblioteca-pwa/components/nivel-tres/nivel-tres.component';
import { HomePrincipalComponent } from './components/home-principal/home-principal.component';


const routes: Routes = [
  {
    path: 'home-pwa',
    children: [
      {
        path: '',
        component: NivelTresComponent
      }
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class HomePwaRoutingModule { }
