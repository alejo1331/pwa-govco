import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { SedesElectronicasModel } from '../models/sedes-electronicas.model';

@Injectable({
  providedIn: 'root'
})
export class VentanillasPortalesService {

  urlApi = environment.serverSedesElectronicas;
  private sede = new BehaviorSubject<any>(null);
  public sedesBusqueda$ = this.sede.asObservable();
  public sedes: any;

  constructor(
    private http: HttpClient
  ) {

  }

  public getVentanillas(): Observable<SedesElectronicasModel[]> {
    return this.http.get<SedesElectronicasModel[]>(`${this.urlApi}/IntegracionSedes/VentanillaUnica/Obtener?busqueda=`);
  }
}
