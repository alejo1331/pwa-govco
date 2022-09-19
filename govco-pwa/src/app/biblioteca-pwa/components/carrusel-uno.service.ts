import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { CarruselUnoInterface } from './carrusel-uno-interface';
import { EstadoInterface } from './estado-interface';
import { TituloInterface } from './titulo-interface';
import { PorMunicipioInterface } from './por-municipio-interface';

@Injectable({
  providedIn: 'root'
})
export class CarruselUnoService {

  base_url: string = environment.serverFichaTramite;
  fichaTramite: string = environment.serverUrlFichaTramite;
  url_HomeAdm: string = environment.serverUrlHomeAdm;

  constructor(private http: HttpClient) { }

  getTramitesMasConsultados(): Observable<CarruselUnoInterface> {
    return this.http.get<CarruselUnoInterface>(`${this.base_url}/LoMasConsultado/ObtenerLoMasConsultado`);
  }

  getTramitesMasConsultadosEstado(): Observable<EstadoInterface> {
    return this.http.get<EstadoInterface>(`${this.url_HomeAdm}/MapaDeSitio/ObtenerSeccionTramitesDestacados`);
  }

  getTramitesMasConsultadosTitulo(seccion: string): Observable<TituloInterface> {
    return this.http.get<TituloInterface>(`${this.fichaTramite}Titulo/ObtenerTitulo?seccion=` + seccion);
  }

  getTramitesMasConsultadosPorMunicipio(codigoCiudad: string | null): Observable<PorMunicipioInterface> {
    return this.http.get<PorMunicipioInterface>(`${this.fichaTramite}LoMasConsultado/ObtenerLoMasConsultado?codigoCiudad=` + codigoCiudad);
  }

  getTramitesMasConsultadosEstadoAsync(){
    
  }
}
