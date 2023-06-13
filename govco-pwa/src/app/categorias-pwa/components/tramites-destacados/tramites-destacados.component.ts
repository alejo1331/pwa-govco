import { data_actualidad } from './../actualidad/actualidad.component';
import { Component, OnInit } from '@angular/core';
import { DetalleMomentosDeVidaService } from '../../services/detalle-momentos-de-vida/detalle-momentos-de-vida.service';
import { PageSizeTramites } from '../../Models/pageSizeTramites';
import { LoMasDestacadoService } from '../../services/lo-mas-destacado/lo-mas-destacado.service'
import { DataLoMasConsultado, DataResultado } from '../../Models/tramites-destacadosModel';

@Component({
  selector: 'app-tramites-destacados',
  templateUrl: './tramites-destacados.component.html',
  styleUrls: ['./tramites-destacados.component.scss']
})
export class TramitesDestacadosComponent implements OnInit {

  titulo: string = "";
  pageSize = 0;
  momentoId :any;
  id_momento : any;
  dataTramites : DataResultado;

  constructor(
    private serviceDetalleMomento: DetalleMomentosDeVidaService,
    private serviceLoMasDestacado : LoMasDestacadoService
  ) { }

 async ngOnInit() {

    this.momentoId = this.serviceDetalleMomento.getIdMomento$.subscribe((id_momento: string) => {
      this.id_momento = id_momento;

    })

    this.titulo ='Trámites destacados';
    this.serviceDetalleMomento.setItemBarra(1);
    await this.parameterPageSize();
  }

  async parameterPageSize() {
    try {
      const resultado: PageSizeTramites = await this.serviceLoMasDestacado.getParameterPageSize().toPromise();
      this.pageSize = parseInt(resultado.data.valor);
      this.getDataTramitesDestacados(this.pageSize, 0)
    } catch (error) {
      console.error(error);
    }
  }

  getDataTramitesDestacados(pageSize: number, pageNumber: number){
    const resultadoTramitesDestacados : any = this.serviceLoMasDestacado.getLoMasConsultado(pageSize, pageNumber, this.id_momento)
    this.dataTramites   = resultadoTramitesDestacados.data







  }

}
