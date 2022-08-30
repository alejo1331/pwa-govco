import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { DetalleConsultaCiiuComponent } from './components/detalle-consulta-ciiu/detalle-consulta-ciiu.component';

const routes: Routes = [
  {
    path: '',
    component: DetalleConsultaCiiuComponent,
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})

export class DetalleConsultaCiiuRoutingModule { }
