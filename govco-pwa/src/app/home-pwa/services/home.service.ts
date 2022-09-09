import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { ObtenerBannerNoticiaRespuesta } from '../models/NoticiasModel';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class HomeService {

  constructor(private http: HttpClient) { }

  
  getNoticias(): Observable<ObtenerBannerNoticiaRespuesta> {
    const noticias = environment.serverUrlNoticia + 'Administracion/ObtenerBannerNoticia?codigo=&codigoCategoria=';
    return this.http.get<ObtenerBannerNoticiaRespuesta>(noticias);
  }
}
