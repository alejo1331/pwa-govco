import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { SideNavComponent } from './components/side-nav/side-nav.component';
import { FooterComponent } from './components/footer/footer.component';
import { ServiciosParaEntidadesComponent } from './components/servicios-para-entidades/servicios-para-entidades.component';


const routes: Routes = [
  {
    path: 'transversales',
    children: [
      {
        path: 'side-nav',
        component: SideNavComponent
      },
      {
        path: 'acerca-del-portal',
        component: FooterComponent
      },
      {
        path: 'servicios-para-entidades',
        component: ServiciosParaEntidadesComponent
      }
    ]
  }
];

@NgModule({
  imports: [
    RouterModule.forChild(routes)
  ],
  
  exports: [RouterModule]
})
export class TransversalesRoutingModule { }
export const ArrayOfComponents = [
]
