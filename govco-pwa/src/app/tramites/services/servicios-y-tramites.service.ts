import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse, HttpHeaders} from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { TramitesDestacadosModel } from '../models/TramitesDestacados.model';

const API_URL = environment.serverUrl;
const API_URL_FICHA = environment.serverUrlFichaTramite;
const API_URL_HOME = environment.serverUrlHome;

@Injectable({
  providedIn: 'root'
})
export class ServiciosYTramitesService {

  private urlTramite = {
    list: 'ServiciosYTramites/GetServiciosYTramites'
  };

  constructor(private http: HttpClient) { }

  private getGeneric<T>(endPoint: string, parameters: string = '') {
    return this.http.get<T>(`${API_URL}${endPoint}${parameters}`, {headers: new HttpHeaders().append('angular-show-loading', 'true')});
  }

  getListTramites() {
    return this.getGeneric<any[]>(this.urlTramite.list);
  }

  getListTramitesDestacados(): Observable<TramitesDestacadosModel[]> {
    return this.http.get<TramitesDestacadosModel[]>(`${API_URL_FICHA}TramitesDestacados/ObtenerListaTramitesDestacados`);
  }

  getListEstadoDestacados(): Observable<any> {
    return this.http.get<any>(`${API_URL_HOME}/MapaDeSitio/ObtenerSeccionTramitesDestacados`);
  }

}
