import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { TramitesHomeComponent } from './components/tramites-home/tramites-home.component';


const routes: Routes = [{
  path: 'tramites',
  children: [

    {
      path: '',
      component: TramitesHomeComponent
    },
  ]
}];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class TramitesRoutingModule { }
