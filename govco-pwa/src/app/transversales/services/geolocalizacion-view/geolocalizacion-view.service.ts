import { Injectable } from '@angular/core';
import { GeolocalizacionService } from '../geolocalizacion/geolocalizacion.service';
import { BehaviorSubject, Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class GeolocalizacionViewService {

  private C_D_COL: string = "TodosLosDepartamentos";
  private C_M_COL: string = "TodosLosMunicipios";

  private info_ubicacion$ = new BehaviorSubject<BaseUbicacion>(base_ubicacion);

  constructor(
    protected ServicioGeolocalizacion: GeolocalizacionService,
  ) {
    this.ServicioGeolocalizacion.getUbicacion.subscribe(([codigoDepartamento, codigoMunicipio]) => {
      if (codigoDepartamento != null && codigoMunicipio != null) {
        this.dataGeolocalizacion();
      }
    })
  }

  public dataGeolocalizacion() {
    const codigoDepartamento: string | null = localStorage.getItem("codigoDepartamento") != null ? localStorage.getItem("codigoDepartamento") : '';
    const codigoMunicipio: string | null = localStorage.getItem("codigoMunicipio") != null ? localStorage.getItem("codigoMunicipio") : '';

    if (codigoMunicipio != '') {
      this.getMunicipiosPorDepartamento([String(codigoDepartamento), String(codigoMunicipio)])
    }
  }

  private getMunicipiosPorDepartamento([codigoDepartamento, codigoMunicipio]: [string, string]) {
    if (codigoDepartamento == this.C_D_COL) {
      this.setUbicacion({
        codigoDepartamento: this.C_D_COL,
        codigoMunicipio: this.C_M_COL,
        nombreDepartamento: 'Toda Colombia',
        nombreMunicipio: 'Toda Colombia'
      })
    }

    if (codigoDepartamento != null) {
      codigoDepartamento = codigoDepartamento != this.C_D_COL ? codigoDepartamento : '';
    } else {
      codigoDepartamento = '';
    }

    if (codigoMunicipio != null) {
      codigoMunicipio = codigoMunicipio != this.C_M_COL ? codigoMunicipio : '';
    } else {
      codigoMunicipio = '';
    }

    if (codigoMunicipio != '') {
      var info_departameto: any = [], info_municipio: any = [];
      this.ServicioGeolocalizacion.getCacheJsonDepartamentos().then((departamentos: any) => {
        info_departameto = departamentos.find((element: any) => element['codigo'] == codigoDepartamento);
      })
      this.ServicioGeolocalizacion.getCacheJsonMunicipiosPorDepartamento(codigoDepartamento)
        .then((municipios: any) => {
          info_municipio = municipios.find((element: any) => element['codigo'] == codigoMunicipio);
          this.setUbicacion({
            codigoDepartamento: codigoDepartamento,
            codigoMunicipio: codigoMunicipio,
            nombreDepartamento: info_departameto['nombre'],
            nombreMunicipio: info_municipio['nombre']
          })
        })
    }
  }

  // Este metodo permite consultar el estado actual de la ubicacion
  public get getUbicacion$(): Observable<BaseUbicacion> {
    return this.info_ubicacion$.asObservable();
  }

  private setUbicacion(ubicacion: BaseUbicacion): void {
    this.info_ubicacion$.next(ubicacion)
  }
}

export interface BaseUbicacion {
  codigoDepartamento: string,
  codigoMunicipio: string,
  nombreDepartamento: string,
  nombreMunicipio: string
}

const base_ubicacion: BaseUbicacion = {
  codigoDepartamento: "",
  codigoMunicipio: "",
  nombreDepartamento: "",
  nombreMunicipio: ""
}