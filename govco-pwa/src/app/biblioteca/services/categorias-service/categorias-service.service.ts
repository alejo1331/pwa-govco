import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import Categoria from '../../shared/models/categoria';

@Injectable({
  providedIn: 'root'
})
export class CategoriasService {

  private urlCategorias = {
    getCategorias: "categorias",
    getCategoriaByNombre: "categorias/getCategoriaByNombre/"
  }

  constructor(private http: HttpClient) { }

  getCategorias(): Observable<Categoria[]> {
    return this.http.get<Categoria[]>(this.urlCategorias.getCategorias);
  }

  getCategoriaByNombre(nombre: string) {
    return this.http.get<Categoria>(this.urlCategorias.getCategoriaByNombre + nombre);
  }
}
