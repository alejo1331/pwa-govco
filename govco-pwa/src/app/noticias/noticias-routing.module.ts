import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ListadoNoticiasComponent } from './components/listado-noticias/listado-noticias.component';
import { DetalleNoticiasComponent } from './components/detalle-noticias/detalle-noticias.component';



const routes: Routes = [
  {
    path: 'noticias',
    children: [
      {
        path: '',
        component: ListadoNoticiasComponent
      },
      {
        path: 'detalle/:id',
        component: DetalleNoticiasComponent
      }
    ]
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class NoticiasRoutingModule { }
