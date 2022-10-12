import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { HomeComponent } from './components/home/home.component';
import { PortalesComponent } from './components/portales/portales.component';


const routes: Routes = [
  {
    path: 'inicio',
    children: [
      {
        path: '',
        component: HomeComponent
      },
    ]
  },
  {
    path: 'portales',
    component: PortalesComponent
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class InicioRoutingModule { }
