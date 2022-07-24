import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { CategoriaModel } from '../../models/categoria-model';

@Injectable({
  providedIn: 'root'
})
export class CategoriaService {
  url_categorias: string = environment.serverCategorias;
  service = 'CategoriasSubcategorias/';

  httpOptions = {
    headers: new HttpHeaders({
      'Content-Type': 'application/json'
    })
  }

  constructor(private http: HttpClient) { }

  ObtenerCategorias(): Observable<CategoriaModel[]> {
    return this.http.get<CategoriaModel[]>(this.url_categorias + this.service+"Categoria/Activas");
  }
}
