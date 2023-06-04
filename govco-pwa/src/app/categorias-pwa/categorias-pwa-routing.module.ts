import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { MomentosDeVidaComponent } from './components/momentos-de-vida/momentos-de-vida.component';
import { DetalleMomentosDeVidaComponent } from './components/detalle-momentos-de-vida/detalle-momentos-de-vida.component';
import { urlsLocal } from 'src/variables-globales/urlsLocal';
import { LoMasConsultadoComponent } from './components/lo-mas-consultado/lo-mas-consultado.component';
import { TodosLosTramitesComponent } from './components/todos-los-tramites/todos-los-tramites.component';
import { TramitesDestacadosComponent } from './components/tramites-destacados/tramites-destacados.component';
import { ActualidadComponent } from './components/actualidad/actualidad.component';

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
        component: DetalleMomentosDeVidaComponent,
        children: [
          {
            path: urlsLocal.c_s_mas_consultado,
            component: LoMasConsultadoComponent
          },
          {
            path: urlsLocal.c_s_todos_los_tramites,
            component: TodosLosTramitesComponent
          },
          {
            path: urlsLocal.c_s_tramites_destacados,
            component: TramitesDestacadosComponent
          },
          {
            path: 'actualidad',
            component: ActualidadComponent
          },
        ]
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
