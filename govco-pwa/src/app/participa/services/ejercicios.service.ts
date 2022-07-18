import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment';

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
}
