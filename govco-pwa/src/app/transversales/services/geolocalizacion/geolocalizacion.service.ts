import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { DepartamentoInterface } from '../../models/geolocalizacion/departamento-interface';
import { MunicipioInterface } from '../../models/geolocalizacion/municipio-interface';

@Injectable({
  providedIn: 'root'
})
export class GeolocalizacionService {

  urlApiEntidades: string = environment.urlApiEntidades;

  constructor(private http: HttpClient) { }

  getDepartamentos():Observable<DepartamentoInterface[]>{
    return this.http.get<DepartamentoInterface[]>(this.urlApiEntidades + '/GeoLocalizacion/ObtenerDepartamentos');
  }

  getMunicipiosPorDepartamento(CodigoDepartamento: string): Observable<MunicipioInterface[]>{
    return this.http.get<MunicipioInterface[]>(this.urlApiEntidades + '/GeoLocalizacion/ObtenerMunicipiosPorDepartamento?codigo='+ CodigoDepartamento)
  }

}
