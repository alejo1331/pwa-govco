import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { map } from 'rxjs/operators';
import {
  TipoFichaTramite, DatosBaseFichaTramite, TipoEnlace,
  TipoAudiencia, MomentosAudienciaTitulo, DataMomentosAudiencia,
  CanalesAtencion, InformacionPago, Normatividad,
  PuntosFichaTramiteEstandar, Embebidos, TramiteNoSuite, Condiciones,
  PuntosAtencionNoSuite, DocumentacionRequerida, Contacto, TrackingTramite
} from '../../models/tramites-id-models/tramites-por-id-interface';
import { PuntosDeAtencionInterface } from '../../models/puntos-de-atencion/puntos-de-atencion-interface';
import { DataBasicaPuntosInterface } from '../../models/puntos-de-atencion/data-basica-puntos-interface';

@Injectable({
  providedIn: 'root'
})
export class TramitesPorIdService {

  private TipoAtencionPrsencial: number;
  private tramite: any;

  API_URL = environment.serverUrlFichaTramite;
  API_URL_AUDITORIA = environment.auditoriaurl;

  private dataPuntosAtencion: DataBasicaPuntosInterface = {
    transitionPuntosAtencion: '100%',
    transitionTramitesId: '0%',
    activar: false,
    idTipo: 0,
    idMomento: 0,
    idAccion: 0
  }

  private abrir = new BehaviorSubject<DataBasicaPuntosInterface> (this.dataPuntosAtencion);
  public abrirPuntosAtencion = this.abrir.asObservable();


  constructor(private http: HttpClient) { }


  public async getAbrirPuntos(data: DataBasicaPuntosInterface) {
    await this.abrir.next(data);
  }



  private getGeneric<T>(endPoint: string, parameters: string): Observable<T> {
    return this.http.get<T>(`${this.API_URL}${endPoint}${parameters}`);
  }

  /********************         FICHA SUIT        *********************/

  GetTipoFichaTramite(idTramite: string): Observable<TipoFichaTramite> {
    return this.getGeneric<TipoFichaTramite>('FichaTramite/GetTipoFichaTramiteById/', idTramite);
  }

  GetDataContactoDudas(idTramite: any) {
    return this.getGeneric<Contacto[]>('FichaTramite/GetDataContactoAreaServicio/', `${idTramite}`);
  }
  GetInfoBasicaEspecifica(idTramite: any) {
    return this.getGeneric<DatosBaseFichaTramite>('FichaTramite/GetInfoBasicaEspecificaById/', idTramite)
      .pipe(
        map((n: DatosBaseFichaTramite) => {
          n.Entidad = n.Entidad.toLowerCase();
          return n;
        })
      );
  }
  GetTipoTramiteFichaEspecificaById(idTramite: string):Observable<TipoEnlace> {
    return this.getGeneric<TipoEnlace>('FichaTramite/GetTipoTramiteFichaEspecificaById/', idTramite);
  }

  GetServicioYTramiteEspecifico(idTramite: any) {
    return this.getGeneric<TipoEnlace>('ServiciosYTramites/GetServicioYTramiteEspecifico/', idTramite);
  }
  GetTiposAudienciaById(idTramite: string):Observable<TipoAudiencia[]> {
    return this.getGeneric<TipoAudiencia[]>('FichaTramite/GetTiposAudienciaById/', idTramite);
  }
  GetMomentosByIdAudiencia(idTramite: any, audiencia: any) {
    return this.getGeneric<MomentosAudienciaTitulo[]>('FichaTramite/GetMomentosByIdAudiencia/', `${idTramite}/${audiencia}`);
  }

  GetDataFichaByIdAudiencia(idTramite: any, audiencia: any, ordenMomento: any) {
    return this.getGeneric<DataMomentosAudiencia[]>('FichaTramite/GetDataFichaByIdAudiencia/', `${idTramite}/${audiencia}/${ordenMomento}`)
      .pipe(
        map((result: any[]) => {
          result.forEach(n => {
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
    return this.getGeneric<PuntosDeAtencionInterface[]>('FichaTramite/GetPuntosAtencionById/', idTramite);
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
    return this.getGeneric<PuntosDeAtencionInterface[]>('FichaTramite/GetPuntosAtencion/', `${idCaso}/${idTipo}/${idTramite}/${idMomento}/${idAccion}`);
  }

  GetFechasByTramite(idTramite: any) {
    return this.getGeneric<any>('FichaTramite/GetFechasEspecificaByTramite/', `${idTramite}`);
  }

  setTipoAtencionPresencial(data: number) {
    this.TipoAtencionPrsencial = data;
  }

  getTipoAtencionPresencial() {
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

  /********************   FICHA NO SUIT   *********************/

  GetNotSuiteTramiteById(idTramite: any) {
    return this.getGeneric<TramiteNoSuite>('FichaNoSuitTramite/GetNotSuiteTramiteById/', idTramite);
  }
  GetConsideracionesAdicionalesById(idTramite: any) {
    return this.getGeneric<Condiciones[]>('FichaNoSuitTramite/GetConsideracionesAdicionalesById/', idTramite);
  }
  GetPuntosAtencionNoSuitById(idTramite: any) {
    return this.getGeneric<PuntosAtencionNoSuite[]>('FichaNoSuitTramite/GetPuntosAtencionNoSuitById/', idTramite);
  }
  GetDocumentacionRequeridaNoSuitById(idTramite: any) {
    return this.getGeneric<DocumentacionRequerida[]>('FichaNoSuitTramite/GetDocumentacionRequeridaById/', idTramite);
  }
  GetPuntoAtencionById(idPunto: any) {
    return this.getGeneric<PuntosDeAtencionInterface>('FichaTramite/GetPuntoAtencionById/', idPunto);
  }

  /********************    EMBEBIDOS    *********************/
  GetEmbebidosByIdTramite(idTramite: any) {
    return this.getGeneric<Embebidos>('TramitesEmbebidos/GetEmbebidosByIdTramite/', idTramite);
  }
  GetBarraProcesoTramite(idTramite: any) {
    return this.getGeneric<any>('etapas-barra/GetDataBarraTramite/', `${idTramite}/Tramites`);
  }

  GenerarTrackingTramite(idTramite: string):Observable<any> {
    let codigoMunicipio: string = localStorage.getItem("codigoMunicipio") == "" ? '' : String(localStorage.getItem("codigoMunicipio"));
    var params: TrackingTramite = (codigoMunicipio != undefined && codigoMunicipio != "" && codigoMunicipio != "TodosLosMunicipios") ? { idTramite: idTramite, idMunicipio: codigoMunicipio } : { idTramite: idTramite, idMunicipio: "" };
    return this.http.post<any>(`${this.API_URL_AUDITORIA}` + "TrackingTramite/TrazaTrackingTramite", params);
  }

  setTramite(data: any) {
    this.tramite = data;
  }

  getTramite(){
    return this.tramite;
  }

}
