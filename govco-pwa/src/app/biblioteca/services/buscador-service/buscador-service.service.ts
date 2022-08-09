import { HttpBackend, HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import Resultados from '../../shared/models/resultados';
import ResultadosBusqueda from '../../shared/models/resultadosBusqueda';

const API_URL_BIBLIOTECA = environment.serverBiblioteca;

@Injectable({
  providedIn: 'root'
})
export class BuscadorService {

  private urlBuscador = {
    getResultados: "buscador"
  }

  private searchSource = new BehaviorSubject('');
  currentSearch = this.searchSource.asObservable();

  private seccionSource = new BehaviorSubject('');
  currentSeccion = this.seccionSource.asObservable();

  private contenidoSource = new BehaviorSubject('');
  currentContenido = this.contenidoSource.asObservable();

  private fechaSource = new BehaviorSubject('');
  currentFecha = this.fechaSource.asObservable();

  constructor(private http: HttpClient,private httpClient: HttpClient, handler: HttpBackend) {
    this.httpClient = new HttpClient(handler);
  }
  getSecciones(): Observable<any[]> {
    return this.httpClient.get<any[]>(`${API_URL_BIBLIOTECA}SeccionNivelUno/ObtenerSeccionesBusquedaPortal`);
  }

  getTipoContenido(): Observable<any[]> {
    return this.httpClient.get<any[]>(`${API_URL_BIBLIOTECA}Contenido/ObtenerContenidosBusquedaPortal`);
  }
  getResultados(filtro: string, fechaPublicacion: string, tipoContenido: string, seccion: string): Observable<Resultados[]> {
    return this.http.get<Resultados[]>(this.urlBuscador.getResultados + '?busqueda=' + filtro + '&fechaPublicacion=' + fechaPublicacion + '&tipoContenido=' + tipoContenido + '&seccion=' + seccion);
  }

  getResultadosBuscador(filtro: string, fechaPublicacion: string, tipoContenido: string, seccion: string): Observable<ResultadosBusqueda[]> {
    return this.httpClient.get<ResultadosBusqueda[]>(`${API_URL_BIBLIOTECA}Busqueda/ObtenerResultados` + '?busqueda=' + filtro + '&fechaPublicacion=' + fechaPublicacion + '&tipoContenido=' + tipoContenido + '&seccion=' + seccion);
  }

  buscar(query: string) {
    this.searchSource.next(query);
  }

  setSeccion(seccion: string) {
    this.seccionSource.next(seccion);
  }

  setContenido(contenido: string) {
    this.contenidoSource.next(contenido);
  }

  setFecha(fecha: string) {
    this.fechaSource.next(fecha);
  }
}
