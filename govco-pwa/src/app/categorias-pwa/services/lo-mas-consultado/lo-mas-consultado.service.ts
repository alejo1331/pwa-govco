import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { TituloInterface } from '../../Models/lo-mas-consultado-interface';

@Injectable({
  providedIn: 'root'
})
export class LoMasConsultadoService {

  urlFichaTramite: string = environment.serverUrlFichaTramite;
  private lo_mas_consultado$ = new BehaviorSubject<LoMasConsultado>(mas_consultado);


  constructor(private htpp: HttpClient) { }


  // El siguiente fragmento de codigo hace parte de la logica funcional "oculto/visible" de la 
  // seccion "lo mas consultado", esta permite consultar la informacion de "lo mas consultado" segun 
  // el id del del momento de vida y su ubicacion. Segun esta informacion permitira determinar
  // el estado visible de la seccion ---> data > 0 ? 'visible' : 'oculto'

  getLoMasConsultado(id: string) {
    this.getTramitesMasConsultadosPorCategoria(id)
      .subscribe((lo_mas_consultado: LoMasConsultado) => {
        this.setLoMasConsultado(lo_mas_consultado);
      })
  }

  getLoMasConsultadoPorUbicacion(municipio: string, id: string) {
    this.getTramitesMasConsultadosPorMunicipioYCategoria(municipio, id)
      .subscribe((lo_mas_consultado: LoMasConsultado) => {
        this.setLoMasConsultado(lo_mas_consultado);
      })
  }

  // El siguiente fragmento de codigo permite escribir y leer los datos "lo mas consultado"
  get getMasConsultado$(): Observable<LoMasConsultado> {
    return this.lo_mas_consultado$.asObservable();
  }

  setLoMasConsultado(mas_consultado: LoMasConsultado): void {
    this.lo_mas_consultado$.next(mas_consultado)
  }

  // ******************************************************************************************
  // El siguiente fragmento de codigo son los end-point de ficha tramite para lo mas consultado

  getTramitesMasConsultadosTitulo(seccion: string): Observable<TituloInterface> {
    return this.htpp.get<TituloInterface>(this.urlFichaTramite + `secciones/` + seccion);
  }

  getTramitesMasConsultadosPorCategoria(idCategoria: string): Observable<LoMasConsultado> {
    return this.htpp.get<LoMasConsultado>(this.urlFichaTramite + `LoMasConsultado/ObtenerLoMasConsultadoPorCategorias?codigoCategoria=` + idCategoria);
  }

  getTramitesMasConsultadosPorMunicipioYCategoria(codigoMunicipio: string, idCategoria: string): Observable<LoMasConsultado> {
    return this.htpp.get<LoMasConsultado>(this.urlFichaTramite + `LoMasConsultado/ObtenerLoMasConsultadoPorCategorias?codigoCiudad=` + codigoMunicipio + `&codigoCategoria=` + idCategoria);
  }

}

export interface BaseInterface {
  succeeded: boolean,
  errors: string | null,
  message: string | null,
  totalRegistros: number
}
export interface LoMasConsultado {
  data: {
    iconoCategoria: string,
    id: string,
    nombre: string
  }[],
  base: BaseInterface
}

const base: BaseInterface = {
  succeeded: true,
  errors: '',
  message: '',
  totalRegistros: 0
}

const mas_consultado: LoMasConsultado = {
  data: [{
    iconoCategoria: '',
    id: '',
    nombre: ''
  }],
  base: base
}
