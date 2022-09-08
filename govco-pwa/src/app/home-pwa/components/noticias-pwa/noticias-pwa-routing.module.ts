import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ListadoNoticiasComponent } from './components/listado-noticias/listado-noticias.component';

const routes: Routes = [
  {
    path: 'noticias-pwa',
    children: [
      {
        path: '',
        component: ListadoNoticiasComponent
      }
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class NoticiasPwaRoutingModule { }
