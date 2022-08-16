import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';

const API_URL_BIBLIOTECA = environment.serverBiblioteca;

@Injectable({
  providedIn: 'root'
})
export class ParametricasService {

  private urlTiempoEtiqueta = {
    getTiempoEtiquetaNuevo: `${API_URL_BIBLIOTECA}parametricas/getTiempoEtiquetaNuevo`
  }
  constructor(private http: HttpClient) { }

  getTiempoEtiquetaNuevo() {
    return this.http.get<any>(this.urlTiempoEtiqueta.getTiempoEtiquetaNuevo);
  }
}
