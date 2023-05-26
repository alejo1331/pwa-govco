import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { CodigosCiiuYTramitesComponent } from '../tramites/components/codigos-ciiu-y-tramites/codigos-ciiu-y-tramites.component';
import { ConsultaCertificadosComponent } from '../tramites/components/ficha-tramite/consulta-certificados/consulta-certificados.component';
import { GeneralComponent } from '../tramites/components/ficha-tramite/detalle/general/general.component';
import { VentanillasUnicasComponent } from '../tramites/components/ficha-tramite/ventanillas-unicas/ventanillas-unicas.component';
import { TramitesHomeComponent } from '../tramites/components/tramites-home/tramites-home.component';
import { urlsLocal } from 'src/variables-globales/urlsLocal';

const routes: Routes = [
  {
    path: urlsLocal.ficha_tramite_pwa,
    children: [
      {
        path: '',
        component: TramitesHomeComponent
      },
      {
        path: urlsLocal.codigo_ciiu_tramites,
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
    path: urlsLocal.certificados,
    component: ConsultaCertificadosComponent
  },
  {
    path: urlsLocal.ventanillas,
    component: VentanillasUnicasComponent
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class TramitesPwaRoutingModule { }
