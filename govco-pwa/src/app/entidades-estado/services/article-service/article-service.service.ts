import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { Repo, RepoCount } from '../../shared/Repo';

@Injectable({
  providedIn: 'root'
})
export class ArticlesService {

  private urlArticle = {
    getListaByCategoria: environment.serverUrl + "TBLENTIDADES/ConsultarCategoriasByClasificacion",
    getRamaEjecutivaByOrden: environment.serverUrl + "TBLENTIDADES/ConsultarRamaEjecutivaByOrden",
    getAllBy: environment.serverUrlBuscador + "/buscador/entidades/",
  }

  constructor(private http: HttpClient) {
  }

  getListaByCategoria(categoriaStr: string, filtro: string) {
    return this.http.get<Repo[]>(this.urlArticle.getListaByCategoria + '?categoria=' + categoriaStr + '&filtro=' + filtro);
  }

  getRamaEjecutivaByOrden(categoriaStr: string, orden: string, filtro: string) {
    return this.http.get<Repo[]>(this.urlArticle.getRamaEjecutivaByOrden + '?categoria=' + categoriaStr + '&orden=' + orden + '&filtro=' + filtro);
  }

  getAllBy(filtro: string) {
    return this.http.post<Repo[]>(this.urlArticle.getAllBy, {"buscar": filtro});
  }
}
