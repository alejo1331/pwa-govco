import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { PerfilHomeComponent } from './perfil-home/perfil-home.component';

const routes: Routes = [{
  path: 'perfil',
  children: [

    {
      path: 'home',
      component: PerfilHomeComponent
    },
  ]
}];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class PerfilRoutingModule { }
