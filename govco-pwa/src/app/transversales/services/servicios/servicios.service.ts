import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { HttpClient, HttpParams } from '@angular/common/http';
import { ServiciosResponse} from '../../models/servicios/servicios-para-entidades-titulo.model'

@Injectable({
  providedIn: 'root'
})
export class ServiciosService {

  url_conoce: string = environment.serverUrlHome;
  url_HomeAdm: string = environment.serverUrlHomeAdm;
  url_apiCross: string = environment.apiCrossUrl;

  constructor(private http: HttpClient) { }

  getTitleAndDescription(codigo: string){
    let params = new HttpParams().set('codigo', codigo);
    return this.http.get<ServiciosResponse>(`${this.url_apiCross}cross/ObtenerTituloPagina`, {params})
  }
}
