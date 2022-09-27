import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import {
  TipoFichaTramite, DatosBaseFichaTramite, TipoEnlace,
  TipoAudiencia, MomentosAudienciaTitulo, DataMomentosAudiencia,
  CanalesAtencion, PuntosAtencion, InformacionPago, Normatividad,
  PuntosFichaTramiteEstandar, Embebidos, TramiteNoSuite, Condiciones,
  PuntosAtencionNoSuite, DocumentacionRequerida, Contacto
} from '../../models/tramites-id-models/tramites-por-id-interface';

@Injectable({
  providedIn: 'root'
})
export class TramitesPorIdService {

  API_URL = environment.serverUrlFichaTramite;

  constructor(private http: HttpClient) { }

  private getGeneric<T>(endPoint: string, parameters: string): Observable<T> {
    return this.http.get<T>(`${this.API_URL}${endPoint}${parameters}`);
  }

  GetTipoFichaTramite(idTramite: any): Observable<TipoFichaTramite> {
    return this.getGeneric<TipoFichaTramite>('FichaTramite/GetTipoFichaTramiteById/', idTramite);
  }
}
