import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { BaseInterface, LoMasConsultado, TituloInterface } from '../../Models/lo-mas-consultado-interface';

@Injectable({
  providedIn: 'root'
})
export class LoMasConsultadoService {

  urlFichaTramite: string = environment.serverUrlFichaTramite;
  private lo_mas_consultado$ = new BehaviorSubject<[LoMasConsultado, string]>([reset_mas_consultado, '']);


  constructor(private htpp: HttpClient) { }


  // El siguiente fragmento de codigo hace parte de la logica funcional "oculto/visible" de la 
  // seccion "lo mas consultado", esta permite consultar la informacion de "lo mas consultado" segun 
  // el id del del momento de vida y su ubicacion. Segun esta informacion permitira determinar
  // el estado visible de la seccion ---> data > 0 ? 'visible' : 'oculto'

  getLoMasConsultado(id: string) {
    this.getTramitesMasConsultadosPorCategoria(id)
      .subscribe((lo_mas_consultado: LoMasConsultado) => {
        const estado: string = lo_mas_consultado.data.length > 0 ? 'true' : 'fasle';
        this.setLoMasConsultado(lo_mas_consultado, estado);
      })
  }

  getLoMasConsultadoPorUbicacion(municipio: string, id: string) {
    this.getTramitesMasConsultadosPorMunicipioYCategoria(municipio, id)
      .subscribe((lo_mas_consultado: LoMasConsultado) => {
        const estado: string = lo_mas_consultado.data.length > 0 ? 'true' : 'fasle';
        this.setLoMasConsultado(lo_mas_consultado, estado);
      })
  }

  // El siguiente fragmento de codigo permite escribir y leer los datos "lo mas consultado"
  get getMasConsultado$(): Observable<[LoMasConsultado, string]> {
    return this.lo_mas_consultado$.asObservable();
  }

  setLoMasConsultado(mas_consultado: LoMasConsultado, estado: string): void {
    this.lo_mas_consultado$.next([mas_consultado, estado])
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

const base: BaseInterface = {
  succeeded: true,
  errors: '',
  message: '',
  totalRegistros: 0
}

const reset_mas_consultado: LoMasConsultado = {
  data: [],
  base: base
}
