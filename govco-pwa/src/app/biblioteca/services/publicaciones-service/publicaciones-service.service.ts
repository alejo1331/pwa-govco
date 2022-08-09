import { HttpBackend, HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { environment } from 'src/environments/environment';
import Categoria from '../../shared/models/categoria';
import { Publicacion } from '../../shared/models/publicacion';
import TagsModel from '../../shared/models/TagsModel';
import { UtilsService } from '../../shared/utils/utils.service';

const API_URL_BIBLIOTECA = environment.serverBiblioteca;

@Injectable({
  providedIn: 'root'
})
export class PublicacionesService {

  private urlPublicaciones = {
    getTags: "publicaciones/gettags",
    getPublicaciones: "publicaciones/getpublicaciones",
    getPublicacionesDestacadas: "publicaciones/getpublicacionesdestacadas",
    getPublicacionesByCategoria: "publicaciones/getpublicacionesbycategoria",
    getTContenidos: "publicaciones/gettcontenidos",
    getPublicacionesRapidas: "publicaciones/getpublicacionesrapidas"
  }

  constructor(private http: HttpClient,
    private utilsService: UtilsService,private httpClient: HttpClient, handler: HttpBackend) {
      this.httpClient = new HttpClient(handler);
    }

  getAllTags(): Observable<TagsModel[]> {
    return this.http.get<TagsModel[]>(this.urlPublicaciones.getTags);
  }

  getPublicaciones(): Observable<Categoria[]> {
    return this.http.get<Categoria[]>(this.urlPublicaciones.getPublicaciones);
  }

  getPublicacionesDestacadas(): Observable<Categoria[]> {
    return this.http.get<Categoria[]>(this.urlPublicaciones.getPublicacionesDestacadas);
  }

  getPublicacionesByCategoria(categoria: string): Observable<Publicacion[]> {
    return this.http.get<Publicacion[]>(this.urlPublicaciones.getPublicacionesByCategoria + '?categoria=' + categoria)
      .pipe(
        map((res) => {
          this.utilsService.newItem(res);
          return res;
        })
      );
  }



  getTContenidos(): Observable<any[]> {
    return this.http.get<any[]>(this.urlPublicaciones.getTContenidos);
  }

  getPublicacionesRapidas(): Observable<Categoria[]> {
    return this.http.get<Categoria[]>(this.urlPublicaciones.getPublicacionesRapidas)
      .pipe(
        map((res) => {
          this.utilsService.newItem(res);
          return res;
        })
      );
  }

  obtenerSeccionInicioPortal(): Observable<any> {
    return this.httpClient.get<any>(`${API_URL_BIBLIOTECA}SeccionInicio/ObtenerSeccionInicioPortal`)
      .pipe(
        map((res) => {
          return res;
        })
      );
  }

  obtenerSeccionNivelUnoPortal(nivel: string): Observable<any> {
    return this.httpClient.get<any>(`${API_URL_BIBLIOTECA}SeccionNivelUno/ObtenerSeccionNivelUnoPortal?idSeccion=` + nivel)
      .pipe(
        map((res) => {
          return res;
        })
      );
  }
}
