import { Injectable } from '@angular/core';
import { HttpClient,HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs';
import { NoticiaPublicadaModel } from '../models/noticiaPublicadaModel';
import { environment } from 'src/environments/environment';
import { NoticiasDetalleModel } from '../models/noticiaDetalleModel';


@Injectable({
  providedIn: 'root'
})
export class NoticiasServiceService {

  private currentPage: number;
  url_apiCross: string = environment.apiCrossUrl;
  urlDetalleNoticia: string = environment.apiNoticiasDetalle;
  url_apiCategoriasSubcategorias: string = environment.serverCategoriaSubcategoriaUrl;
  url_apiNoticias: string = environment.serverUrlNoticias;

  private urls: any = {
    noticiasPaginadas: 'Noticias/GetNoticiasPublicadas',
    countNoticias: 'Noticias/GetTotalNoticiasPublicadas',
    detalleNoticia: 'Noticias/get'
  }

  constructor(private http: HttpClient) {
    this.currentPage = 0;
  }

  setCurrentPage(current: number): void {
    this.currentPage = current;
  }

  getCurrentPage(): number {
    return this.currentPage;
  }

  //obtiene el listado de noticias disponible para visualizar
  obtenerNoticiasPaginadas(page: number, pageSize: number): Observable<NoticiaPublicadaModel[]> {
    const url = environment.serverUrlNoticias + this.urls.noticiasPaginadas + '?page=' + page + '&pageSize=' + pageSize;
    return this.http.get<NoticiaPublicadaModel[]>(url);
  }

  obtenerNoticiasPaginacion(filtro:any){
  //  try {
      const headers = { 'content-type': 'application/json'};
      const body=JSON.stringify(filtro);
      console.log(body)
      return this.http.post<any>(`${this.url_apiNoticias}Noticias/ObtenerNoticiasFiltradas`,body,{'headers':headers});
    //} catch (error) {
     // console.log("Error obtenerNoticiasPaginacion --> "+error);
     // return null;
    //}
  }

  //Obtiene el detalle de la noticia
  obtenerDetalleNoticia(id: string) {
    const url = environment.serverUrlNoticias + this.urls.detalleNoticia + '/' + id;
    return this.http.get<NoticiaPublicadaModel>(url);
  }

  // Obtiene el detalle de la noticia con las noticias relacionadas a esta
  getNoticiasPorId(id: string): Observable<NoticiasDetalleModel> {
    const params = new HttpParams().set('codigo', id);
    return this.http.get<NoticiasDetalleModel>(`${this.urlDetalleNoticia}Noticias/ObtenerSeccionDetalleNoticia`, {params})
  }

  obtenerTotalNoticias(): Observable<number> {
    const url = environment.serverUrlNoticias + this.urls.countNoticias;
    return this.http.get<number>(url);
  }
}
