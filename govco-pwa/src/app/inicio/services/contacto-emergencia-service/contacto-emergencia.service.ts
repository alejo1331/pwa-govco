import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { ContactoEmergenciaModel } from '../../models/contacto-emergencia-model';

@Injectable({
  providedIn: 'root'
})
export class ContactoEmergenciaService {

  url_contactos: string = environment.serverUrlHome;

  constructor(private http: HttpClient) { }

  getContactos():Observable<ContactoEmergenciaModel[]>{
    return this.http.get<ContactoEmergenciaModel[]>(`${this.url_contactos}/ContactoEmergencia/GetContEmergencia`);
  }
}
