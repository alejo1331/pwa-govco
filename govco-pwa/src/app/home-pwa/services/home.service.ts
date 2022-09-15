import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { ObtenerBannerNoticiaRespuesta } from '../models/NoticiasModel';
import { ObtenerTemasInteresRespuesta } from '../models/TemasInteresModel';
import { BannerPrincipalModel } from '../models/banner-principal.model';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class HomeService {

  constructor(private http: HttpClient) { }
  
  obtenerNoticias(): Observable<ObtenerBannerNoticiaRespuesta> {
    const noticias = environment.serverUrlNoticia + 'Administracion/ObtenerBannerNoticia?codigo=&codigoCategoria=';
    return this.http.get<ObtenerBannerNoticiaRespuesta>(noticias);
  }

  obtenerTemasInteres(): Observable<ObtenerTemasInteresRespuesta> {
    const temasInteres = environment.serverUrlHome + '/TemasDeInteres';
    return this.http.get<ObtenerTemasInteresRespuesta>(temasInteres);
  }

  getBannerPrincipal():Observable<BannerPrincipalModel>{
    return this.http.get<BannerPrincipalModel>(`${environment.serverUrlHomeAdm}/BannerPrincipal`);
  }
}
