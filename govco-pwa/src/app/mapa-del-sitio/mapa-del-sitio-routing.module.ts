import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { MapaDelSitioComponent } from './components/mapa-del-sitio/mapa-del-sitio.component';

const routes: Routes = [
  { 
    path:'mapa-del-sitio', component: MapaDelSitioComponent
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class MapaDelSitioRoutingModule { }
