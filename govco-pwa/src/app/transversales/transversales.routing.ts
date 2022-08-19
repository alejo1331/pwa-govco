import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { FooterComponent } from './components/footer/footer.component';
import { CajaHerramientasComponent } from './components/caja-herramientas/caja-herramientas.component';
import { ServiciosParaEntidadesComponent } from './components/servicios-para-entidades/servicios-para-entidades.component';


const routes: Routes = [
  { path: 'acerca-del-portal', component: FooterComponent },
  { path: 'servicios-para-entidades', component: ServiciosParaEntidadesComponent },
  { path: 'caja-de-herramientas', component: CajaHerramientasComponent }
];

@NgModule({
  imports: [
    RouterModule.forRoot(routes)
  ],

  exports: [RouterModule]
})
export class TransversalesRoutingModule { }
export const ArrayOfComponents = [
]
