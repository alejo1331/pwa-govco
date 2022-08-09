import { HttpBackend, HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { Publicacion } from '../../shared/models/publicacion';
import Recurso from '../../shared/models/recurso';

const API_URL_BIBLIOTECA = environment.serverBiblioteca;

@Injectable({
  providedIn: 'root'
})
export class RecursosService {

  private urlRecursos = {
    getInfoByRecurso: "recursos/getinfobyrecurso/",
    getRecursosInteresByCategoria: "recursos/getrecursosinteresbycategoria/",
    descargarArchivoComprimido: "recursos/descargarComprimidoDeArchivosPorTarea/"
  }

  constructor(private http: HttpClient,private httpClient: HttpClient, handler: HttpBackend) {
    this.httpClient = new HttpClient(handler);
  }

  getInfoByRecurso(recurso: string): Observable<Recurso> {
    return this.http.get<Recurso>(this.urlRecursos.getInfoByRecurso + recurso);
  }

  getrecursosinteresbycategoria(categoria: string): Observable<Publicacion[]> {
    return this.http.get<Publicacion[]>(this.urlRecursos.getRecursosInteresByCategoria + categoria);
  }

  descargarZip(tareaId: number): Observable<any> {
    return this.http.get(this.urlRecursos.descargarArchivoComprimido + tareaId, {
      responseType: 'blob',
      headers: new HttpHeaders().append('angular-show-loading', 'true')
    });
  }


  tamanoArchivos(ids: string): Observable<any> {
    return this.httpClient.get<any>(`${API_URL_BIBLIOTECA}Recursos/TamanoArchivos?ids=` + ids);
  }


  descargarArchivos(ids: string): Observable<any> {
    return this.http.get("Recursos/DescargarComprimidoDeArchivos?ids=" + ids, {
      responseType: 'blob',
      headers: new HttpHeaders().append('angular-show-loading', 'true')
    });
  }

  ObtenerSeccionNivelPortal(idNivel:string,nivel: string): Observable<any>{
    if(nivel==="dos"){
      return this.httpClient.get<any>(`${API_URL_BIBLIOTECA}SeccionNivelDos/ObtenerSeccionNivelDosPortal?idSeccion=` + idNivel);
    }else if (nivel ==="tres"){
      return this.httpClient.get<any>(`${API_URL_BIBLIOTECA}SeccionNivelTres/ObtenerSeccionNivelTresPortal?idSeccion=` + idNivel);
    }
  }
}
