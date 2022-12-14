import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { EstadoInterface } from '../../models/tramites-mas-consultados/estado-interface';
import { GeneralInterface } from '../../models/tramites-mas-consultados/general-interface';
import { PorMunicipioInterface } from '../../models/tramites-mas-consultados/por-municipio-interface';
import { TituloInterface } from '../../models/tramites-mas-consultados/titulo-interface';

@Injectable({
  providedIn: 'root'
})
export class TramitesMasConsultadosService {

  base_url: string = environment.serverFichaTramite;
  fichaTramite: string = environment.serverUrlFichaTramite;
  url_HomeAdm: string = environment.serverUrlHomeAdm;

  constructor(private http: HttpClient) { }

  getTramitesMasConsultados(): Observable<GeneralInterface> {
    return this.http.get<GeneralInterface>(`${this.base_url}/LoMasConsultado/ObtenerLoMasConsultado`);
  }

  getTramitesMasConsultadosEstado(): Observable<EstadoInterface> {
    return this.http.get<EstadoInterface>(`${this.url_HomeAdm}/MapaDeSitio/ObtenerSeccionTramitesDestacados`);
  }

  getTramitesMasConsultadosTitulo(seccion: string): Observable<TituloInterface> {
    return this.http.get<TituloInterface>(`${this.fichaTramite}secciones/` + seccion);
  }

  getTramitesMasConsultadosPorMunicipio(codigoCiudad: string | null): Observable<PorMunicipioInterface> {
    return this.http.get<PorMunicipioInterface>(`${this.fichaTramite}LoMasConsultado/ObtenerLoMasConsultado?codigoCiudad=` + codigoCiudad);
  }
}
