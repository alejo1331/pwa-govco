import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { ConsultaUbicacionInterface } from '../../models/geolocalizacion/consulta-ubicacion-interface';
import { DepartamentoInterface } from '../../models/geolocalizacion/departamento-interface';
import { MunicipioInterface } from '../../models/geolocalizacion/municipio-interface';

@Injectable({
  providedIn: 'root'
})
export class GeolocalizacionService {

  urlApiEntidades: string = environment.urlApiEntidades;

  private message = new BehaviorSubject<string>('Ingresa tu ubicación');

  public customMessage = this.message.asObservable();

  constructor(private http: HttpClient) { }

  public changeMessage(msg: string): void {
    this.message.next(msg);
  }

  getDepartamentos():Observable<DepartamentoInterface[]>{
    return this.http.get<DepartamentoInterface[]>(this.urlApiEntidades + '/GeoLocalizacion/ObtenerDepartamentos');
  }

  getMunicipiosPorDepartamento(CodigoDepartamento: string): Observable<MunicipioInterface[]>{
    return this.http.get<MunicipioInterface[]>(this.urlApiEntidades + '/GeoLocalizacion/ObtenerMunicipiosPorDepartamento?codigo='+ CodigoDepartamento)
  }

  getUbicacion(latitude:string, longitude:string): Observable<ConsultaUbicacionInterface>{
    return this.http.get<ConsultaUbicacionInterface>(this.urlApiEntidades + '/GeoLocalizacion/ObtenerGeolocalizacion?latitud='+ latitude + '&longitud=' + longitude)
  }

}
