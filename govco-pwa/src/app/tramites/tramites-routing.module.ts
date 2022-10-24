import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { TramitesHomeComponent } from './components/tramites-home/tramites-home.component';
import { CodigosCiiuYTramitesComponent } from './components/codigos-ciiu-y-tramites/codigos-ciiu-y-tramites.component';
import { GeneralComponent } from './components/ficha-tramite/detalle/general/general.component';
import { ConsultaCertificadosComponent } from './components/ficha-tramite/consulta-certificados/consulta-certificados.component';
import { VentanillasUnicasComponent } from './components/ficha-tramite/ventanillas-unicas/ventanillas-unicas.component';


const routes: Routes = [
  // {
  //   path: 'ficha-tramites-y-servicios',
  //   children: [
  //     {
  //       path: '',
  //       component: TramitesHomeComponent
  //     },
  //     {
  //       path: 'codigos-ciiu-y-tramites',
  //       component: CodigosCiiuYTramitesComponent
  //     },
  //     {
  //       path: ':id',
  //       component: GeneralComponent
  //     },
  //     {
  //       path:  'detalle-consulta-ciiu/:idCodigo/:dpto/:municipio/:codigo',
  //       loadChildren: () => import('./components/detalle-consulta-ciiu/detalle-consulta-ciiu.module').then(m => m.DetalleConsultaCiiuModule),
  //       data: {
  //         title: 'Detalle consulta CIIU'
  //       }
  //     },
  //   ]
  // },
  // {
  //   path: 'consulta-certificados',
  //   component: ConsultaCertificadosComponent
  // },
  // {
  //   path: 'ventanillas-unicas',
  //   component: VentanillasUnicasComponent
  // },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class TramitesRoutingModule { }
