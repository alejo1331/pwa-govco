import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class ParametricasService {

  private urlTiempoEtiqueta = {
    getTiempoEtiquetaNuevo: 'parametricas/getTiempoEtiquetaNuevo'
  }
  constructor(private http: HttpClient) { }

  getTiempoEtiquetaNuevo() {
    return this.http.get<any>(this.urlTiempoEtiqueta.getTiempoEtiquetaNuevo);
  }
}
