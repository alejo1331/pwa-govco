import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { CodigosCiiuYTramitesComponent } from '../tramites/components/codigos-ciiu-y-tramites/codigos-ciiu-y-tramites.component';
import { ConsultaCertificadosComponent } from '../tramites/components/ficha-tramite/consulta-certificados/consulta-certificados.component';
import { GeneralComponent } from '../tramites/components/ficha-tramite/detalle/general/general.component';
import { VentanillasUnicasComponent } from '../tramites/components/ficha-tramite/ventanillas-unicas/ventanillas-unicas.component';
import { TramitesHomeComponent } from '../tramites/components/tramites-home/tramites-home.component';
import { TramitesIdComponent } from './components/tramites-principal/tramites-id.component';

const routes: Routes = [
  {
    path: 'ficha-tramites-y-servicios',
    children: [
      {
        path: '',
        component: TramitesHomeComponent
      },
      {
        path: 'codigos-ciiu-y-tramites',
        component: CodigosCiiuYTramitesComponent
      },
      {
        path: ':id',
        component: GeneralComponent
      },
      {
        path:  'detalle-consulta-ciiu/:idCodigo/:dpto/:municipio/:codigo',
        loadChildren: () => import('./../tramites/components/detalle-consulta-ciiu/detalle-consulta-ciiu.module').then(m => m.DetalleConsultaCiiuModule),
        data: {
          title: 'Detalle consulta CIIU'
        }
      },
    ]
  },
  {
    path: 'consulta-certificados',
    component: ConsultaCertificadosComponent
  },
  {
    path: 'ventanillas-unicas',
    component: VentanillasUnicasComponent
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class TramitesPwaRoutingModule { }
