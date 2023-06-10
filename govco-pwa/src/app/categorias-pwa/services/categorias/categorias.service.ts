import { Injectable } from '@angular/core';
import {
  HttpClient,
  HttpErrorResponse,
  HttpParams,
} from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { environment } from 'src/environments/environment';
import { MomentosTitle } from './../../Models/MomentosModel';
import { CategoriasModel } from './../../Models/CategoriasModel';

@Injectable({
  providedIn: 'root',
})
export class CategoriasService {
  urlcategorias: string = environment.serverCategoriaSubcategoriaUrl;
  urlcategoriasPaginado: string = environment.serverCategoriasUrl;
  url_apiCross: string = environment.apiCrossUrl;
  errorMsg?: string;
  categoriasMomentos: string = 'MV';
  categoriasParametro: string = 'NumMomentoLista';

  constructor(private http: HttpClient) {}

  getTitleAndDescription(codigo: string) {
    let params = new HttpParams().set('codigo', codigo);
    return this.http
      .get<MomentosTitle>(`${this.url_apiCross}cross/ObtenerTituloPagina`, {
        params,
      })
      .pipe(
        catchError((error) => {
          return this.errorMensaje(error);
        })
      );
  }

  getCategorias() {
    return this.http
      .get<CategoriasModel[]>(
        `${this.urlcategorias}Categorias/Categorias/TipoCategoria/${this.categoriasMomentos}`
      )
      .pipe(
        catchError((error) => {
          return this.errorMensaje(error);
        })
      );
  }

  getCategoriasPorId(id: string): Observable<CategoriasModel[]> {
    return this.http
      .get<CategoriasModel[]>(
        `${this.urlcategorias}CategoriasSubcategorias/Categoria/${id}`
      )
      .pipe(
        catchError((error) => {
          return this.errorMensaje(error);
        })
      );
  }

  getCategoriasPaginacion(page: number): Observable<CategoriasModel[]> {
    return this.http
      .get<CategoriasModel[]>(
        `${this.urlcategoriasPaginado}Categorias/Categorias/TipoCategoriaPaginado/${this.categoriasMomentos}/${this.categoriasParametro}/${page}`
      )
      .pipe(
        catchError((error) => {
          return this.errorMensaje(error);
        })
      );
  }

  public errorMensaje(error: any) {
    if (error.error instanceof ErrorEvent) {
      this.errorMsg = `Error: ${error.error.message}`;
    } else {
      this.errorMsg = this.getServerErrorMessage(error);
    }
    return throwError(this.errorMsg);
  }

  private getServerErrorMessage(error: HttpErrorResponse): string {
    switch (error.status) {
      case 404: {
        return `Not Found: ${error.message}`;
      }
      case 403: {
        return `Access Denied: ${error.message}`;
      }
      case 500: {
        return `Internal Server Error: ${error.message}`;
      }
      default: {
        return `Unknown Server Error: ${error.message}`;
      }
    }
  }
}
