import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { ParticipaModel } from '../models/participa.model';
import { OpinionModel } from '../models/opinion.model';
import { environment } from 'src/environments/environment';

const API_URL = environment.apiUrlUrna;
 const ARI_CROSS = environment.apiCross;

@Injectable({
  providedIn: 'root'
})
export class ParticipaService {

  constructor(private http: HttpClient) { }

  private getGeneric<T>(endPoint: string, parameters: string = '') {
    return this.http.get<T>(`${API_URL}${endPoint}${parameters}`);
  }

  getHome() {
    return this.getGeneric<ParticipaModel>('home');
  }

  // Servicio para obtener el titulo y la descripcion de tu opinion cuenta
  getTitleAndDescription() {
    const params = new HttpParams().set('codigo', environment.codParticipa);
    return this.http.get<OpinionModel>(`${ARI_CROSS}cross/ObtenerTituloPagina`, { params })
  }
}
