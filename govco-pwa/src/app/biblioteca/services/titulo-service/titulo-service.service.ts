import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class TituloService {
  
  private urlTitulo = {
    getTitulo: 'titulo'
  }
  constructor(private http: HttpClient) { }

  getTitulo() {
    return this.http.get<any>(this.urlTitulo.getTitulo);
  }
}
