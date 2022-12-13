import { Injectable } from '@angular/core';

//Client
import { HttpClient, HttpHeaders } from '@angular/common/http'
import { Observable } from 'rxjs';

//Models
import { Departamento } from '../models/departamento';
import { Municipio } from '../models/municipio';
import { CodigoCIIU } from '../models/codigo-ciiu';
import { environment } from 'src/environments/environment';
import { RequestCodigo } from '../models/request-codigociiu';
import { RequestHistoricoBusqueda } from '../models/request-historico-busqueda';
import { ResponseCodigoPaginated } from '../models/response-codigo-paginated';
import { PageRequestTramite } from '../models/page-request-tramite';
import { CIIUTramite } from '../models/ciiutramite';
import { Response } from '../models/response';
import { PreguntaTramite } from '../models/pregunta-tramite';

@Injectable({
  providedIn: 'root'
})
export class BackendApiService {

  restUrl:string = environment.UrlAPIConsultaCIIU;
  auditoriUrl:string = environment.auditoriaurl;

  httpOptions = {
    headers: new HttpHeaders({
      'Content-Type': 'application/json'
    })
  };

  constructor( private http: HttpClient ) { }
  
  getListDepartamento(): Observable<Departamento[]>{
    return this.http.get<Departamento[]>( this.restUrl+"Departamento" );
  }

  getListMunicipio(Id:string): Observable<Municipio[]>{
    return this.http.get<Municipio[]>( this.restUrl+"Municipio/"+Id );
  }

  getCodigoCIIU(Id:number): Observable<CodigoCIIU>{
    return this.http.get<CodigoCIIU>( this.restUrl+"codigoCIIU/ObtenerCodigoCIIUAngular/"+Id );
  }

  getActividadesEconomicas(filtro:string): Observable<CodigoCIIU[]>{
    return this.http.get<CodigoCIIU[]>( this.restUrl+"codigoCIIU/ObtenerActividadesEconomicas/"+filtro);
  }

  getCodigosCIIUValidadosPorTramite(requestCod: RequestCodigo): Observable<ResponseCodigoPaginated>{
    return this.http.post<ResponseCodigoPaginated>(this.restUrl+"codigoCIIU/ObtenerActividadesEconomicas/requestCodigo",requestCod, this.httpOptions);
  }

  insertarHistoricoDeBusquedaCIIU(request: RequestHistoricoBusqueda){
    return this.http.post(this.auditoriUrl+"BuscadorCIIU/HistoricoBusqueda",request,{responseType: 'text'});
  }

  obtenerTramitesObligatorios( request: PageRequestTramite ): Observable<Response<CIIUTramite[]>>{
    return this.http.post<Response<CIIUTramite[]>>(this.restUrl+"CIIUTramite/obligatorios", request, this.httpOptions);
  }

  obtenerTramitesCondicionados( request: PageRequestTramite ): Observable<PreguntaTramite[]>{
    return this.http.post<PreguntaTramite[]>(this.restUrl+"PreguntaText/tramites", request, this.httpOptions);
  }

  TotalTramitesObligatorios( request: PageRequestTramite ): Observable<number>{
    return this.http.post<number>(this.restUrl+"CIIUTramite/obligatorios/total", request, this.httpOptions);
  }
}
