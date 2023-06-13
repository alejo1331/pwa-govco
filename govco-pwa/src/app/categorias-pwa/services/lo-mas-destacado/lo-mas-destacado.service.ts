import { Injectable } from '@angular/core';
import { Observable, BehaviorSubject } from 'rxjs';
import { PageSizeTramites } from '../../Models/pageSizeTramites';
import { environment } from 'src/environments/environment';
import { HttpClient } from '@angular/common/http';
import { DataLoMasConsultado } from '../../Models/tramites-destacadosModel'


@Injectable({
  providedIn: 'root'
})
export class LoMasDestacadoService {

  private sigla: string = 'NumMomentoDestacadoLista';
  urlTramitesDestacados: string = environment.serverTramitesDestacados;


constructor(private http: HttpClient) { }

getParameterPageSize(): Observable<PageSizeTramites> {
  const url = environment.urlApiParametros + 'ObtenerValorParametro?sigla=' + this.sigla;
  return this.http.post<PageSizeTramites>(url, {});
}

getLoMasConsultado(pageSize: number, pageNumber: number, idCategoria: number): Observable<DataLoMasConsultado> {
  return this.http.get<DataLoMasConsultado>(this.urlTramitesDestacados + `/ObtenerListaTramitesDestacadosPorCategoriaPaginada?` + `idCategoria=` + idCategoria + `&cantidad=` + pageSize+ `&pagina=` + pageNumber);
}

}
