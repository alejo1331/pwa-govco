import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';

const API_URL_BIBLIOTECA = environment.serverBiblioteca;

@Injectable({
  providedIn: 'root'
})
export class TituloService {
  
  private urlTitulo = {
    getTitulo: 'titulo'
  }
  constructor(private http: HttpClient) { }

  getTitulo() {
    return this.http.get<any>(`${API_URL_BIBLIOTECA}titulo`);
  }
}
