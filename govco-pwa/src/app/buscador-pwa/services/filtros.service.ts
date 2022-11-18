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

  private filters = new BehaviorSubject<FiltroBusqueda | undefined>(undefined);

  private resultadoBusqueda = new BehaviorSubject<ResultadoFiltro | undefined>(undefined);

  private data: ResultadoFiltro = {
    success: 0,
    message: "",
    total: 0,
    seconds: 0,
    data: [],
    tituloSugerido: null,
    filtros: [
      {
        categorias: [],
        subcategorias: [],
        entidadNombre: [],
        sector: [],
        fechaPublicacionFiltro: [],
        fechaCierreFiltro: [],
        estado: [],
        sugerenciasFiltro: [],
        tipoEntidad: [],
        nombreEstandarizado: [],
        anioPublicacionFiltro: [],
        mesPublicacionFiltro: [],
        departamento: { codigoDepartamento: 5 },
        municipio: { codigoMunicipio: 5001 }
      }
    ]
  };

  constructor(private http: HttpClient) { }

  obtenerResultadoFiltro(dataBusqueda: FiltroBusqueda): Observable<ResultadoFiltro> {
    const data = {
      filters: dataBusqueda.filters,
      pageNumber: dataBusqueda.pageNumber,
      pageSize: dataBusqueda.pageSize,
      search: dataBusqueda.search,
      sort: dataBusqueda.sort
    }

    const buscar = environment.serverBuscador + dataBusqueda.seccion + '/buscar/';
    return this.http.post<ResultadoFiltro>(buscar, data);
  }

  // Asigna un nuevo valor a filtros, de los seleccionados y dispara un evento para que en los suscribe lo escuchen
  set setFilters(filters: FiltroBusqueda | undefined) {
    this.filters.next(filters);
  }

  // Observable para suscribirse a los filtros seleccionado, es decir cada vez que se asigne un valor a filters, se consulta nuevamente los resultados de busqueda
  get Filters$(): Observable<FiltroBusqueda | undefined> {
    return this.filters;
  }

  // Obtener el ultimo filtro seleccionado
  get getFilters(): FiltroBusqueda | undefined {
    return this.filters.getValue();
  }

  // Asigna un nuevo valor a resultado busqueda y dispara un evento para que en los suscribe lo escuchen
  set ResultadoBusqueda(resultadoBusqueda: ResultadoFiltro | undefined) {
    this.resultadoBusqueda.next(resultadoBusqueda);
  }

  // Observable para suscribirse a los resultados busqueda, es decir con cada cambio en los filtros este se actualiza
  get ResultadoBusqueda$(): Observable<ResultadoFiltro | undefined> {
    return this.resultadoBusqueda;
  }

  // Obtener el ultimo resultado de busqueda, en componentes donde no se cambien los filtros
  get ResultadoBusqueda(): ResultadoFiltro | undefined {
    return this.resultadoBusqueda.getValue();
  }

}
