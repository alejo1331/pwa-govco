import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { EntidadesEstadoComponent } from './components/entidades-estado/entidades-estado.component';

const routes: Routes = [
  {
    path: 'entidades',
    children: [
      {
        path: '',
        component: EntidadesEstadoComponent
      },
    ]
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class EntidadesEstadoRoutingModule { }
