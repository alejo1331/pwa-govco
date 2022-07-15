import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { TramitesMasConsultadosInterface } from '../../models/tramites-mas-consultados-interface';

@Injectable({
  providedIn: 'root'
})
export class TramitesMasConsultadosService {
  base_url: string = environment.urlApiTramites;
  
  constructor(private http: HttpClient) { }

  getTramitesConsultados(): Observable<TramitesMasConsultadosInterface[]> {
    return this.http.get<TramitesMasConsultadosInterface[]>(`${this.base_url}/MasUsados/GetInfoHomeMasUsados`);
  }
}
