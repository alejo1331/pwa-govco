import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { CarruselUnoInterface } from './carrusel-uno-interface';

@Injectable({
  providedIn: 'root'
})
export class CarruselUnoService {

  base_url: string = environment.serverFichaTramite;

  constructor(private http: HttpClient) { }

  getTramitesMasConsultadosAsync(): Observable<CarruselUnoInterface> {
    return this.http.get<CarruselUnoInterface>(`${this.base_url}/LoMasConsultado/ObtenerLoMasConsultado`);
  }

  getTramitesMasConsultadosEstadoAsync(){
    
  }
}
