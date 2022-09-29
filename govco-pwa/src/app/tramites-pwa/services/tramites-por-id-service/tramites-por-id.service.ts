import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { map } from 'rxjs/operators';
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

  /********************         FICHA SUIT        *********************/

  GetTipoFichaTramite(idTramite: any): Observable<TipoFichaTramite> {
    return this.getGeneric<TipoFichaTramite>('FichaTramite/GetTipoFichaTramiteById/', idTramite);
  }

  GetDataContactoDudas(idTramite: any) {
    return this.getGeneric<Contacto[]>('FichaTramite/GetDataContactoAreaServicio/', `${idTramite}`);
  }
  GetInfoBasicaEspecifica(idTramite: any) {
    return this.getGeneric<DatosBaseFichaTramite>('FichaTramite/GetInfoBasicaEspecificaById/', idTramite)
    .pipe(
      map( (n: DatosBaseFichaTramite) => {
        n.Entidad = n.Entidad.toLowerCase();
        return n;
      })
    );
  }
  GetTipoTramiteFichaEspecificaById(idTramite: any) {
    return this.getGeneric<TipoEnlace>('FichaTramite/GetTipoTramiteFichaEspecificaById/', idTramite);
  }

  GetServicioYTramiteEspecifico(idTramite: any) {
    return this.getGeneric<TipoEnlace>('ServiciosYTramites/GetServicioYTramiteEspecifico/', idTramite);
  }
  GetTiposAudienciaById(idTramite: any) {
    return this.getGeneric<TipoAudiencia[]>('FichaTramite/GetTiposAudienciaById/', idTramite);
  }
  GetMomentosByIdAudiencia(idTramite: any, audiencia: any) {
    return this.getGeneric<MomentosAudienciaTitulo[]>('FichaTramite/GetMomentosByIdAudiencia/' , `${idTramite}/${audiencia}`);
  }

  GetDataFichaByIdAudiencia(idTramite: any, audiencia: any, ordenMomento: any) {
    return this.getGeneric<DataMomentosAudiencia[]>('FichaTramite/GetDataFichaByIdAudiencia/', `${idTramite}/${audiencia}/${ordenMomento}`)
      .pipe(
        map( (result: any[]) => {
          result.forEach( n => {
            n.Valor = parseFloat(n.Valor);
          });
          return result;
        })
      );
  }

  GetDataFichaByIdTramiteAudienciaIdMomento(idTramite: any, audiencia: any, idMomento: any) {
    // tslint:disable-next-line: max-line-length
    return this.getGeneric<DataMomentosAudiencia[]>('FichaTramite/GetDataFichaByIdTramiteAudienciaIdMomento/', `${idTramite}/${audiencia}/${idMomento}`);
  }

  GetCanalesByMomentoIdAudiencia(idTramite: any, audiencia: any, momento: any, accion: any) {
    // tslint:disable-next-line: max-line-length
    return this.getGeneric<CanalesAtencion[]>('FichaTramite/GetCanalesByMomentoIdAudiencia/', `${idTramite}/${audiencia}/${momento}/${accion}`);
  }
  GetPuntosAtencionById(idTramite: any) {
    return this.getGeneric<PuntosAtencion[]>('FichaTramite/GetPuntosAtencionById/', idTramite);
  }

  GetPagosByMomentoIdAudiencia(idTramite: any, audiencia: any, momento: any) {
    return this.getGeneric<InformacionPago[]>('FichaTramite/GetPagosByMomentoIdAudiencia/', `${idTramite}/${audiencia}/${momento}`);
  }
  GetNormatividadById(idTramite: any) {
    return this.getGeneric<Normatividad[]>('FichaTramite/GetNormatividadById/', idTramite);
  }
  GetInfoFichaEstandarById(idTramite: any) {
    return this.getGeneric<PuntosFichaTramiteEstandar>('FichaTramite/GetInfoFichaEstandarById/', idTramite);
  }

  GetPuntosAtencion(idCaso: any, idTipo: any, idTramite: any, idMomento: any, idAccion: any) {
    // tslint:disable-next-line: max-line-length
    return this.getGeneric<PuntosAtencion[]>('FichaTramite/GetPuntosAtencion/', `${idCaso}/${idTipo}/${idTramite}/${idMomento}/${idAccion}`);
  }

  GetFechasByTramite(idTramite: any) {
    return this.getGeneric<PuntosAtencion[]>('FichaTramite/GetFechasEspecificaByTramite/', `${idTramite}`);
  }

  setTipoAtencionPresencial(data: number) {
    this.TipoAtencionPrsencial = data;
  }

  getTipoAtencionPresencial(){
    return this.TipoAtencionPrsencial;
  }

  GetMediosSeguimiento(idTramite: any) {
    return this.getGeneric<CanalesAtencion[]>('FichaTramite/GetMediosSeguimientoPersonal/', `${idTramite}`);
  }

  GetMediosSeguimientoNoPersonal(idTramite: any) {
    return this.getGeneric<CanalesAtencion[]>('FichaTramite/GetMediosSeguimientoNoPersonal/', `${idTramite}`);
  }

  GetDataFichaResult(idTramite: any) {
    return this.getGeneric<any>('FichaTramite/GetDataFichaResult/', `${idTramite}`);
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
