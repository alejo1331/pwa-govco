import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { NoticiasComponent } from './components/noticias/noticias.component';
import { DetalleNoticiasComponent } from './components/detalle-noticias/detalle-noticias.component';


const routes: Routes = [
  {
    path: 'menu',
    children: [
      {
        path: 'noticias',
        component: NoticiasComponent
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
