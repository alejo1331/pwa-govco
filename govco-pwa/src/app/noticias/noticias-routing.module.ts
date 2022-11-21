import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { DetalleNoticiasComponent } from './components/detalle-noticias/detalle-noticias.component';
import { ActualidadPrincipalComponent } from './components/actualidad-principal/actualidad-principal.component';

const routes: Routes = [
  {
    path: 'noticias',
    children: [
      {
        path: '',
        component: ActualidadPrincipalComponent
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
