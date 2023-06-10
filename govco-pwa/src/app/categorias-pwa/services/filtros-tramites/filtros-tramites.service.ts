import { Injectable } from '@angular/core';
import { Observable, BehaviorSubject } from 'rxjs';
import { FiltroBusquedaTramites } from '../../Models/filtroBusquedaTramitesModel';
import { ResultadoFiltroTramites } from '../../Models/resultadoFiltroTramitesModel';
import { HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment';
import { PageSizeTramites } from '../../Models/pageSizeTramites';

@Injectable({
  providedIn: 'root'
})
export class FiltrosTramitesService {

  private filters = new BehaviorSubject<FiltroBusquedaTramites | undefined>(undefined);
  private resultadoBusqueda = new BehaviorSubject<ResultadoFiltroTramites | undefined>(undefined);
  private abrirAviso$ = new BehaviorSubject<boolean>(false);
  private sigla: string = 'NumMomentoTodosTramitesLista';

  private data: ResultadoFiltroTramites = {
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

  obtenerResultadoFiltro(dataBusqueda: FiltroBusquedaTramites): Observable<ResultadoFiltroTramites> {
    const buscar = environment.serverBuscador + 'tramite/buscar/';
    return this.http.post<ResultadoFiltroTramites>(buscar, dataBusqueda);
  }

  // Asigna un nuevo valor a filtros, de los seleccionados y dispara un evento para que en los suscribe lo escuchen
  set setFilters(filters: FiltroBusquedaTramites | undefined) {
    this.filters.next(filters);
  }

  // Observable para suscribirse a los filtros seleccionado, es decir cada vez que se asigne un valor a filters, se consulta nuevamente los resultados de busqueda
  get getFilters$(): Observable<FiltroBusquedaTramites | undefined> {
    return this.filters;
  }

  // Obtener el ultimo filtro seleccionado
  get getFilters(): FiltroBusquedaTramites | undefined {
    return this.filters.getValue();
  }

  // Asigna un nuevo valor a resultado busqueda y dispara un evento para que en los suscribe lo escuchen
  set ResultadoBusqueda(resultadoBusqueda: ResultadoFiltroTramites | undefined) {
    this.resultadoBusqueda.next(resultadoBusqueda);
  }

  // Observable para suscribirse a los resultados busqueda, es decir con cada cambio en los filtros este se actualiza
  get ResultadoBusqueda$(): Observable<ResultadoFiltroTramites | undefined> {
    return this.resultadoBusqueda;
  }

  // Obtener el ultimo resultado de busqueda, en componentes donde no se cambien los filtros
  get ResultadoBusqueda(): ResultadoFiltroTramites | undefined {
    return this.resultadoBusqueda.getValue();
  }

  get EmptyData(): ResultadoFiltroTramites {
    return JSON.parse(JSON.stringify(this.data));
  }
 
  // Obtener el observador de apertura del aviso cuando no se encuentran resultados
  get getAbrirAvisor$ (): Observable<boolean>{
    return this.abrirAviso$.asObservable();
  }

  // Asigna valor para abrir o cerrar el aviso cuando no se encuentran resultados
  set setAbrirAviso(abrir : boolean){
    this.abrirAviso$.next(abrir)
  }

  getParameterPageSize(): Observable<PageSizeTramites> {
    const url = environment.urlApiParametros + 'ObtenerValorParametro?sigla=' + this.sigla;
    return this.http.post<PageSizeTramites>(url, {});
  }
}
