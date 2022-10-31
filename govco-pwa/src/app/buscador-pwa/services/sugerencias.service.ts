import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class SugerenciasService {

constructor(private http: HttpClient) { }

// Obtener las sugerencias por pre filtro y cantidad de sugerencias
obtenerSugerencias(prefiltro: any, parametroBusqueda : any, cantidadSugerencias: any){
  const url = environment.serverBuscador + 'Sugerencia/' + prefiltro + '/' + parametroBusqueda + '/' + cantidadSugerencias;
  return this.http.get<any>(url)
}

}
