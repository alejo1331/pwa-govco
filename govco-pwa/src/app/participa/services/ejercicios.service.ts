import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../../environments/environment';
import { FiltrosParticipacionModel } from '../models/FiltrosParticipacionModels';

const API_URL = environment.apiUrl;

@Injectable({
  providedIn: 'root'
})
export class EjerciciosService {

  constructor(private http: HttpClient) { }

  private getGeneric<T>(endPoint: string, parameters: string = '') {
    return this.http.get<T>(`${API_URL}${endPoint}${parameters}`);
  }

  getEjercicios(pages: number, pageSize: number) {
    return this.getGeneric<any>('ejercicios/get', `/${pages}/${pageSize}`);
  }

  obtenerEjerciciosPaginacion(filtro: FiltrosParticipacionModel){
    try {
      const headers = { 'content-type': 'application/json'};
      const body=JSON.stringify(filtro);
      return this.http.post<any>(`${API_URL}Ejercicios/paginated`,body,{'headers':headers});
    } catch (error) {
      console.log("Error obtenerEjerciciosPaginacion --> "+error);
      return null;
    }
  }
}
