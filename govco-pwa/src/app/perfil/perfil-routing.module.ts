import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { PerfilHomeComponent } from './components/perfil-home/perfil-home.component';

const routes: Routes = [{
  path: 'perfil',
  children: [

    {
      path: '',
      component: PerfilHomeComponent
    },
  ]
}];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class PerfilRoutingModule { }
