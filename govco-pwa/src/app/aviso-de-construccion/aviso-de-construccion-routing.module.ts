import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { FooterComponent } from '../transversales/components/footer/footer.component';
import { AvisoDeConstruccionComponent } from './aviso-de-construccion/aviso-de-construccion.component';

const routes: Routes = [
  {
    path: 'transversales',
    children: [
      {
        path: 'acerca-del-portal',
        component: FooterComponent
      }
    ]
  },
  {
    path: 'ficha-tramites-y-servicios',
    children: [
      {
        path: ':id',
        component: AvisoDeConstruccionComponent
      }
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class AvisoDeConstruccionRoutingModule { }
