import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { MomentosDeVidaComponent } from './components/momentos-de-vida/momentos-de-vida.component';
import { DetalleMomentosDeVidaComponent } from './components/detalle-momentos-de-vida/detalle-momentos-de-vida.component';
import { urlsLocal } from 'src/variables-globales/urlsLocal';

const routes: Routes = [
  {
    path: urlsLocal.categorias_subcategorias,
    children: [
      {
        path: '',
        component: MomentosDeVidaComponent
      },
      {
        path: ':id',
        component: DetalleMomentosDeVidaComponent
      },
      {
        path: '**',
        redirectTo: 'momentos-de-vida'
      }
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class CategoriasPwaRoutingModule { }
