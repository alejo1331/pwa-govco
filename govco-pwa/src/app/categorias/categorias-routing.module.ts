import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { DetalleMomentosComponent } from './components/detalle-momentos/detalle-momentos.component';
import { MomentosDeVidaComponent } from './components/momentos-de-vida/momentos-de-vida.component';

const routes: Routes = [
  {
    path: 'categorias-subcategorias-pwa',
    children: [
      {
        path: '',
        component: MomentosDeVidaComponent
      },
      {
        path: ':id',
        component: DetalleMomentosComponent
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
export class CategoriasRoutingModule { }
