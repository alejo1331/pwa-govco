import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { ServiciosHomeComponent } from './components/servicios-home/servicios-home.component';


const routes: Routes = [{
  path: 'servicios',
  children: [

    {
      path: '',
      component: ServiciosHomeComponent
    },
  ]
}];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ServiciosRoutingModule { }
