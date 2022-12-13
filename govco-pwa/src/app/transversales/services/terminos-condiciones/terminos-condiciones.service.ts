import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { HttpClient } from '@angular/common/http';
import { TerminosCondicionesModel } from '../../models/terminos-condiciones/terminos-condiciones.model';
;

const API_URL = environment.serverUrlHome;

@Injectable({
  providedIn: 'root'
})
export class TerminosCondicionesService {

  constructor(private http: HttpClient) { }

  private getGeneric<T>(endPoint: string, parameters: string = '') {
    return this.http.get<T>(`${API_URL}${endPoint}${parameters}`);
  }

  getTerminosCondiciones() {
    return this.getGeneric<TerminosCondicionesModel>('/terminoscondiciones');
  }
}
