import { Injectable } from '@angular/core';
import { Observable, BehaviorSubject } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { ResultadoFiltro } from '../models/resultadoFiltroModel';
import { environment } from 'src/environments/environment';
import { FiltroBusqueda } from '../models/filtroBusquedaModel';

@Injectable({
  providedIn: 'root'
})
export class FiltrosService {

  private filters = new BehaviorSubject<FiltroBusqueda>({
    filters: null,
    pageNumber: 1,
    pageSize: 10,
    search: "",
    sort: "",
    seccion: "tramite"
  });

  private resultadoBusqueda = new BehaviorSubject<ResultadoFiltro | undefined>(undefined)

  constructor(private http: HttpClient) { }
  
  obtenerResultadoFiltro(dataBusqueda: FiltroBusqueda): Observable<ResultadoFiltro> {
    const buscar = environment.serverBuscador + dataBusqueda.seccion + '/buscar/';
    return this.http.post<ResultadoFiltro>(buscar, dataBusqueda);
  }

  set Filters(filters: FiltroBusqueda) {
    this.filters.next(filters);
  }

  get Filters$(): Observable<FiltroBusqueda> {
    return this.filters;
  }

  set ResultadoBusqueda(resultadoBusqueda: ResultadoFiltro) {
    this.resultadoBusqueda.next(resultadoBusqueda);
  }

  get ResultadoBusqueda$(): Observable<ResultadoFiltro | undefined> {
    return this.resultadoBusqueda;
  }

}
