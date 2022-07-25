import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { TituloModel, Data } from '../../models/titulo-model';


@Injectable({
  providedIn: 'root'
})
export class EntidadesService {
  private UrlEndPoint = environment.serverIntegracion;
  private ApiCross = environment.severApiCross;
  private serverUrl = environment.urlApiEntidades;

  public httpOptions = {
    headers: new HttpHeaders({
      'Content-Type': 'application/json'
    })
  }

  public titulos: Data[] = []

  
  


  constructor(private http: HttpClient) { }

  // Servicio para obtner entidad (TBL_AUTORIDAD) a partir del nombre
  getEntitybyName(entityName: string):Observable<any>{
    return this.http.post<any>(this.UrlEndPoint+"ObtenerEntidadPorNombre",'\"'+entityName+'\"', this.httpOptions);
  }

  //Servicio para obtener titulo y description de la entidad
  getTitleAndDescription(){
    const params = new HttpParams().set('codigo', 'entidades');
    return this.http.get<TituloModel>(`${this.ApiCross}cross/ObtenerTituloPagina`, {params})
  }

  getEntidades(){
    try {
      return this.http.get<any>(`${this.serverUrl}/Ramas`)
    } catch (error) {
      console.log("Error getEntidades --> "+error);
      return null;
    }
  }
}
