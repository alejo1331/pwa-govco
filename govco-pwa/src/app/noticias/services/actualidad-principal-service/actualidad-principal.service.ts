import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { environment } from 'src/environments/environment';



@Injectable({
  providedIn: 'root'
})
export class ActualidadPrincipalService {

  url_apiCross: string = environment.apiCrossUrl;
  url_apiCategoriasSubcategorias: string = environment.serverCategoriaSubcategoriaUrl;
  url_apiEntidades: string = environment.serverEntidades;
  url_apiNoticias: string = environment.serverUrl;

  private urls: any = {
    noticiasPaginadas: 'Noticias/GetNoticiasPublicadas',
    countNoticias: 'Noticias/GetTotalNoticiasPublicadas',
    detalleNoticia: 'Noticias/get'
  }

  constructor(private http: HttpClient) {
  }

  getTitleAndDescription(codigo: string) {
    let params = new HttpParams().set('codigo', codigo);
    return this.http.get<any>(`${this.url_apiCross}cross/ObtenerTituloPagina`, { params })
  }

  getMomentosDeVida() {
    return this.http.get<any>(`${this.url_apiCategoriasSubcategorias}Categorias/Categorias/TipoCategoria/MV`)
  }

  getSubCategorias(codigoCategoria: any) {
    //try {
    return this.http.get<any>(`${this.url_apiCategoriasSubcategorias}CategoriasSubcategorias/Subcategoria/Categoria/Subcategorias/` + codigoCategoria)
    //  } 
    //catch (error) {
    //console.log("Error getSubcategoria --> "+error);
    // return null;
    //}
  }

  getSectores() {
    //try {
    return this.http.get<any>(`${this.url_apiEntidades}Sector/ObtenerSectores`)
    // } catch (error) {
    // console.log("Error getSectores --> "+error);
    // return null;
    //}
  }

  getEntidades(filtro: any) {
    //  try {
    // const filter = {categoria:categoria,subCategoria:subCategoria,sector:sector,entidad:entidad,fechaPublicacion:fechaPublicacion};
    const headers = { 'content-type': 'application/json' };
    const body = JSON.stringify(filtro);
    return this.http.post<any>(`${this.url_apiNoticias}Noticias/ObtenerEntidadesNoticiasFiltradas`, body, { 'headers': headers });
    //    } catch (error) {
    //   console.log("Error getSectores --> "+error);
    //      return null;
    //}
  }
}
