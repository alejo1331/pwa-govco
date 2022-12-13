import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { MapaSitioInterface } from '../../models/mapa-sitio-interface';

const API_URL = environment.serverUrlHome;


@Injectable({
  providedIn: 'root'
})
export class MapaSitioService {

  constructor(private http: HttpClient) { }

  private getGeneric<T>(endPoint: string, parameters: string = '') {
    return this.http.get<T>(`${API_URL}${endPoint}${parameters}`);
  }

  getMapaSitio() {
    return this.getGeneric<MapaSitioInterface[]>('/MapaSitio');
  }
}
