import { Injectable } from '@angular/core';

//Client
import { HttpClient, HttpHeaders } from '@angular/common/http'
import { from, Observable } from 'rxjs';

//Models
import { Departamento } from '../models/departamento';
import { Municipio } from '../models/municipio';
import { CodigoCIIU } from '../models/codigo-ciiu';
import { environment } from 'src/environments/environment';
import { requestCodigo } from '../models/request-codigociiu';
import { requestHistoricoBusqueda } from '../models/request-historico-busqueda';
import { responseCodigoPaginated } from '../models/response-codigo-paginated';

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

  getCodigosCIIUValidadosPorTramite(requestCodigo: requestCodigo): Observable<responseCodigoPaginated>{
    return this.http.post<responseCodigoPaginated>(this.restUrl+"codigoCIIU/ObtenerActividadesEconomicas/requestCodigo",requestCodigo, this.httpOptions);
  }

  insertarHistoricoDeBusquedaCIIU(request: requestHistoricoBusqueda){
    return this.http.post(this.auditoriUrl+"BuscadorCIIU/HistoricoBusqueda",request,{responseType: 'text'});
  }
}
