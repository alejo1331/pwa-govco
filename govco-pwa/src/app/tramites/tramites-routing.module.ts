import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { TramitesHomeComponent } from './components/tramites-home/tramites-home.component';
import { CodigosCiiuYTramitesComponent } from './components/codigos-ciiu-y-tramites/codigos-ciiu-y-tramites.component';


const routes: Routes = [{
  path: 'tramites',
  children: [

    {
      path: '',
      component: TramitesHomeComponent
    },
    {
      path: 'codigos-ciiu-y-tramites',
      component: CodigosCiiuYTramitesComponent
    },
  ]
}];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class TramitesRoutingModule { }
