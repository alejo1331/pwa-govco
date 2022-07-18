import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from 'src/app/noticias/environments/environment';
import { Observable } from 'rxjs';
import { NoticiaPublicadaModel } from '../models/noticiaPublicadaModel';

@Injectable({
  providedIn: 'root'
})
export class NoticiasServiceService {

  private currentPage: number;

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
    const url = environment.serverUrl + this.urls.noticiasPaginadas + '?page=' + page + '&pageSize=' + pageSize;
    return this.http.get<NoticiaPublicadaModel[]>(url);
  }

  //Obtiene el detalle de la noticia
  obtenerDetalleNoticia(id: string): Observable<NoticiaPublicadaModel> {
    const url = environment.serverUrl + this.urls.detalleNoticia + '/' + id;
    return this.http.get<NoticiaPublicadaModel>(url);
  }

  obtenerTotalNoticias(): Observable<number> {
    const url = environment.serverUrl + this.urls.countNoticias;
    return this.http.get<number>(url);
  }
}
