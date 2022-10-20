import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { ResultadoFiltro } from '../models/resultadoFiltroModel';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class FiltrosService {

  constructor(private http: HttpClient) { }
  
  obtenerResultadoFiltro(): Observable<ResultadoFiltro> {
    const noticias = environment.serverBuscador + 'entidad/buscar/';
    return this.http.get<ResultadoFiltro>(noticias);
  }

}
