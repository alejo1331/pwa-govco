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

  private TipoAtencionPrsencial: number;

  API_URL = environment.serverUrlFichaTramite;
  API_URL_AUDITORIA = environment.auditoriaurl;

  constructor(private http: HttpClient) { }

  private getGeneric<T>(endPoint: string, parameters: string): Observable<T> {
    return this.http.get<T>(`${this.API_URL}${endPoint}${parameters}`);
  }

  GetTipoFichaTramite(idTramite: any): Observable<TipoFichaTramite> {
    return this.getGeneric<TipoFichaTramite>('FichaTramite/GetTipoFichaTramiteById/', idTramite);
  }
  
  GetTipoTramiteFichaEspecificaById(idTramite: any) {
    return this.getGeneric<TipoEnlace>('FichaTramite/GetTipoTramiteFichaEspecificaById/', idTramite);
  }

  setTipoAtencionPresencial(data: number) {
    this.TipoAtencionPrsencial = data;
  }

  GetTiposAudienciaById(idTramite: any) {
    return this.getGeneric<TipoAudiencia[]>('FichaTramite/GetTiposAudienciaById/', idTramite);
  }

  GetMomentosByIdAudiencia(idTramite: any, audiencia: any) {
    return this.getGeneric<MomentosAudienciaTitulo[]>('FichaTramite/GetMomentosByIdAudiencia/' , `${idTramite}/${audiencia}`);
  }
  
  GetBarraProcesoTramite(idTramite: any) {
    return this.getGeneric<any>('etapas-barra/GetDataBarraTramite/',  `${idTramite}/Tramites`);
  }

  GenerarTrackingTramite(idTramite: any){
    const ubicacion = localStorage.getItem("ubicacion") || '';
    var codigoMunicipio = localStorage.getItem("ubicacion") == "" ? undefined : JSON.parse(ubicacion)?.codigoMunicipio;
    var params=(codigoMunicipio!=undefined && codigoMunicipio!="" && codigoMunicipio!="Todos")? {"idTramite": idTramite,"idMunicipio": codigoMunicipio}:{"idTramite": idTramite,"idMunicipio": ""};
    return this.http.post<any>(`${this.API_URL_AUDITORIA}`+"TrackingTramite/TrazaTrackingTramite", params);
  }
}
