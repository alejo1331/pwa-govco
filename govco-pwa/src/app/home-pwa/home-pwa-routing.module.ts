import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomePrincipalComponent } from './components/home-principal/home-principal.component';

const routes: Routes = [
  {
    path: 'home-pwa',
    children: [
      {
        path: '',
        component: HomePrincipalComponent
      }
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class HomePwaRoutingModule { }
