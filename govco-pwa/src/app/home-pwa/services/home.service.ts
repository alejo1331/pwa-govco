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

  
  obtenerNoticias(): Observable<ObtenerBannerNoticiaRespuesta> {
    // console.log('getNoticias')
    // try {
      const noticias = environment.serverUrlNoticia + 'Administracion/ObtenerBannerNoticia?codigo=&codigoCategoria=';
      console.log(noticias)
      return this.http.get<ObtenerBannerNoticiaRespuesta>(noticias);
    // } catch (error) {
    //   console.log("Error ObtenerBannerNoticiaRespuesta --> "+error);
    //   return null;
    // }
  }
}
