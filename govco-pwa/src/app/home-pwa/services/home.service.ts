import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { CabeceraActualidad, DataNoticias, ObtenerBannerNoticiaRespuesta } from '../models/NoticiasModel';
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

  obtenerActualidadGeneral(): Observable<CabeceraActualidad> {
    const actualidad = environment.serverUrlNoticia + 'secciones/actualidad-general';
    return this.http.get<CabeceraActualidad>(actualidad);
  }

  obtenerCotenidoNoticias(): Observable<DataNoticias> {
    const seccion_noticias = environment.serverUrlNoticia + 'Noticias/categorias/0';
    return this.http.get<DataNoticias>(seccion_noticias);
  }

  obtenerTemasInteres(): Observable<ObtenerTemasInteresRespuesta> {
    const temasInteres = environment.serverUrlHome + '/TemasDeInteres';
    return this.http.get<ObtenerTemasInteresRespuesta>(temasInteres);
  }

  getBannerPrincipal():Observable<BannerPrincipalModel>{
    return this.http.get<BannerPrincipalModel>(`${environment.serverUrlHomeAdm}/BannerPrincipal`);
  }
}
