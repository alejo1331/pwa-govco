import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { LoMasConsultado, PorMunicipioInterface, TituloInterface } from '../../Models/lo-mas-consultado-interface';

@Injectable({
  providedIn: 'root'
})
export class LoMasConsultadoService {

  urlFichaTramite: string = environment.serverUrlFichaTramite;

  constructor(private htpp: HttpClient) { }

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
