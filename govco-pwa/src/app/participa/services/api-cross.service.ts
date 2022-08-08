import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class ApiCrossService {

  url_apiCross: string = environment.apiCross;


  constructor(private http: HttpClient) {
  }

  getTitleAndDescription(codigo: string){
    let params = new HttpParams().set('codigo', codigo);
    return this.http.get<any>(`${this.url_apiCross}cross/ObtenerTituloPagina`, {params})
  }
}
