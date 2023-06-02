import { Component, OnDestroy, OnInit } from '@angular/core';
import { LoMasConsultadoService } from '../../services/lo-mas-consultado/lo-mas-consultado.service';
import { LoMasConsultado } from '../../Models/lo-mas-consultado-interface';
import { DetalleMomentosDeVidaService } from '../../services/detalle-momentos-de-vida/detalle-momentos-de-vida.service';
import { Subscription } from 'rxjs';
import { GeolocalizacionViewService } from 'src/app/transversales/services/geolocalizacion-view/geolocalizacion-view.service';

@Component({
  selector: 'govco-app-lo-mas-consultado',
  templateUrl: './lo-mas-consultado.component.html',
  styleUrls: ['./lo-mas-consultado.component.scss']
})
export class LoMasConsultadoComponent implements OnInit, OnDestroy {

  codigoDepartamento: string = "";
  codigoMunicipio: string = "";
  nombreMunicipio: string = "";
  titulo: string = 'Lo más consultado';

  public data_mas_consultado: data_mas_consultado[] = [];
  private getParametroId: Subscription
  private getUbicacion: Subscription;
  private id_momento: string;

  constructor(
    private serviceFichaTramite: LoMasConsultadoService,
    private serviceDetalleMomento: DetalleMomentosDeVidaService,
    protected serviceGeoView: GeolocalizacionViewService
  ) { }

  ngOnInit(): void {
    this.getParametroId = this.serviceDetalleMomento.getIdMomento$.subscribe((id_momento: string) => {
      this.id_momento = id_momento;
      this.getUbicacion = this.serviceGeoView.getUbicacion$.subscribe((data: BaseUbicacion) => {
        this.codigoDepartamento = data.codigoDepartamento;
        this.codigoMunicipio = data.codigoMunicipio;
        this.nombreMunicipio = data.nombreMunicipio;
        if (data.codigoMunicipio != "TodosLosMunicipios" && data.codigoMunicipio != '') {
          this.serviceFichaTramite.getLoMasConsultadoPorUbicacion(data.codigoMunicipio, id_momento);
          this.getUbicacion = this.serviceFichaTramite.getMasConsultado$.subscribe((data: LoMasConsultado) => {
            this.getArrayPush(data);
          })
        } else {
          this.serviceFichaTramite.getLoMasConsultado(id_momento);
          this.getUbicacion = this.serviceFichaTramite.getMasConsultado$.subscribe((data: LoMasConsultado) => {
            this.getArrayPush(data);
          })
        }
      })
    })

  }

  private getArrayPush(lo_mas_consultado: LoMasConsultado) {
    this.data_mas_consultado = []
    if (lo_mas_consultado.data.length > 0) {
      lo_mas_consultado.data.forEach((element) => {
        this.data_mas_consultado.push(
          {
            link: '/ficha-tramites-y-servicios/T' + element.id,
            titulo: element.nombre
          }
        )
      })
    }
  }

  ngOnDestroy(): void {
    this.getParametroId.unsubscribe;
    this.getUbicacion.unsubscribe
  }

}

export interface data_mas_consultado {
  link: string,
  titulo: string
}

export interface BaseUbicacion {
  codigoDepartamento: string,
  codigoMunicipio: string,
  nombreMunicipio: string
}
