import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { ConsultaUbicacionInterface } from '../../models/geolocalizacion/consulta-ubicacion-interface';
import { DepartamentoInterface } from '../../models/geolocalizacion/departamento-interface';
import { MunicipioInterface } from '../../models/geolocalizacion/municipio-interface';
import { CacheStorageService } from '../cache-storage-service/cache-storage.service';

@Injectable({
  providedIn: 'root'
})
export class GeolocalizacionService {

  urlApiEntidades: string = environment.urlApiEntidades;

  private datosUbicacion = new BehaviorSubject<[string, string]>(['null', 'null']);
  public coordenadas = this.datosUbicacion.asObservable();

  constructor(
    private http: HttpClient,
    protected servicioCache:CacheStorageService
    ) { }

  public ubicacion(codigoDepartamento: string, codigoMunicipio: string): void {
    this.datosUbicacion.next([codigoDepartamento, codigoMunicipio]);
  }

  getEstadoServicioGeolocalizacion(): Observable<boolean> {
    let url = this.urlApiEntidades + '/GeoLocalizacion/ObtenerEstadoGeolocalizacion';
    return this.http.get<boolean>(url)
  }

  cacheJsonDepartamentos(){
    let url = this.urlApiEntidades + '/GeoLocalizacion/ObtenerDepartamentos';
    return this.servicioCache.cacheStorege(url, 'geolocalizacion-json', 'departamentos', '.json').then(data => { return data })
  }

  getCacheJsonDepartamentos(){
    return this.servicioCache.getCacheStorage('departamentos','.json').then(json => { return json });
  }

  getDepartamentos(): Observable<DepartamentoInterface[]> {
    let url = this.urlApiEntidades + '/GeoLocalizacion/ObtenerDepartamentos';
    return this.http.get<DepartamentoInterface[]>(url);
  }

  cacheJsonMunicipiosPorDepartamento(codigoDepartamento: string){
    let url = this.urlApiEntidades + '/GeoLocalizacion/ObtenerMunicipiosPorDepartamento?codigo=' + codigoDepartamento;
    return this.servicioCache.cacheStorege(url, 'geolocalizacion', codigoDepartamento,'.json').then(data => { return data })
  }

  getCacheJsonMunicipiosPorDepartamento(codigoDepartamento: string){
    return this.servicioCache.getCacheStorage(codigoDepartamento,'.json').then(json => { return json });
  }

  getMunicipiosPorDepartamento(codigoDepartamento: string): Observable<MunicipioInterface[]> {
    return this.http.get<MunicipioInterface[]>(this.urlApiEntidades + '/GeoLocalizacion/ObtenerMunicipiosPorDepartamento?codigo=' + codigoDepartamento)
  }

  getUbicacionActual(latitude: string, longitude: string): Observable<ConsultaUbicacionInterface> {
    return this.http.get<ConsultaUbicacionInterface>(this.urlApiEntidades + '/GeoLocalizacion/ObtenerGeolocalizacion?latitud=' + latitude + '&longitud=' + longitude)
  }

}
