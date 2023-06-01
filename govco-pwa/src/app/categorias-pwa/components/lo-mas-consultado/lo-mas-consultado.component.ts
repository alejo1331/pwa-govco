import { Component, OnDestroy, OnInit } from '@angular/core';
import { LoMasConsultadoService } from '../../services/lo-mas-consultado/lo-mas-consultado.service';
import { LoMasConsultado } from '../../Models/lo-mas-consultado-interface';
import { DetalleMomentosDeVidaService } from '../../services/detalle-momentos-de-vida/detalle-momentos-de-vida.service';
import { Subscription } from 'rxjs';

@Component({
  selector: 'govco-app-lo-mas-consultado',
  templateUrl: './lo-mas-consultado.component.html',
  styleUrls: ['./lo-mas-consultado.component.scss']
})
export class LoMasConsultadoComponent implements OnInit, OnDestroy {

  codigoMunicipio: string | null = "";
  nombreMunicipio: string = "";
  titulo: string = "";

  public data_mas_consultado: data_mas_consultado[];
  private getParametroId: Subscription;
  private id_momento: string;

  constructor(
    private serviceFichaTramite: LoMasConsultadoService,
    private serviceDetalleMomento: DetalleMomentosDeVidaService
  ) { }

  ngOnInit(): void {
    this.getParametroId = this.serviceDetalleMomento.getIdMomento$.subscribe((id_momento: string)=>{
     this.id_momento = id_momento;
    })

    this.titulo = 'Lo más consultado';
    this.codigoMunicipio = '0005';
    this.nombreMunicipio = 'Bogotá D.C.';
    // ejemplo: deseo estudiar 20 ---> beta
    this.serviceFichaTramite.getTramitesMasConsultadosPorCategoria(this.id_momento).subscribe((lo_mas_consultado: LoMasConsultado) => {
      this.data_mas_consultado = []
      lo_mas_consultado.data.forEach((element) => {
        this.data_mas_consultado.push(
          {
            link: '/ficha-tramites-y-servicios/T' + element.id,
            titulo: element.nombre
          }
        )
      })
    })

    // ejemplo: Medellin 05001  y deseo estudiar 20 ---> beta
    this.serviceFichaTramite.getTramitesMasConsultadosPorMunicipioYCategoria('05001', '20').subscribe((data: LoMasConsultado) => {
      console.log('por municipio', data)
    })
    
  }

  ngOnDestroy(): void {
    this.getParametroId.unsubscribe;
  }

}

export interface data_mas_consultado {
  link: string,
  titulo: string
}
