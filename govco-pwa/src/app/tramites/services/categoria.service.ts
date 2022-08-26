import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

//Models
import { CategoriaModel } from '../models/categoria.model';

//Environment
import { environment } from 'src/environments/environment';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class CategoriaService {

  url_categorias: string = environment.serverCategorias;
  service = '';

  constructor(private http: HttpClient) { }

  //Categorias
  ObtenerCategorias(): Observable<CategoriaModel[]> {
    return this.http.get<CategoriaModel[]>(this.url_categorias + this.service+"Categoria/Activas");
  }
}
