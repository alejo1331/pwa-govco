import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { MomentosDeVidaComponent } from './components/momentos-de-vida/momentos-de-vida.component';
import { DetalleMomentosDeVidaComponent } from './components/detalle-momentos-de-vida/detalle-momentos-de-vida.component';
import { urlsLocal } from 'src/variables-globales/urlsLocal';
import { LoMasConsultadoComponent } from './components/lo-mas-consultado/lo-mas-consultado.component';
<<<<<<< HEAD
import { TodosLosTramitesComponent } from './components/todos-los-tramites/todos-los-tramites.component';
=======
import { TramitesDestacadosComponent } from './components/tramites-destacados/tramites-destacados.component';
>>>>>>> 39ff8c91 (feat: #HU:4.1.1 #SP:1 #comment Maquetacion seccion de tramites destacados, enrrutamiento de seccion y boton de ver mas)

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
            path: 'lo-mas-consultado',
            component: LoMasConsultadoComponent
          },
          {
<<<<<<< HEAD
            path: 'todos-los-tramites',
            component: TodosLosTramitesComponent
=======
            path: 'tramites-destacados',
            component: TramitesDestacadosComponent
>>>>>>> 39ff8c91 (feat: #HU:4.1.1 #SP:1 #comment Maquetacion seccion de tramites destacados, enrrutamiento de seccion y boton de ver mas)
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
