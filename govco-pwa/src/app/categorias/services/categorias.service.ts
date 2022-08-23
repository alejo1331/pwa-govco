import { HttpClient, HttpErrorResponse, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { environment } from 'src/environments/environment';
import { CategoriasInterface } from '../models/categorias-interface';
import { Momentos } from '../models/momentos-title-interface';

@Injectable({
  providedIn: 'root'
})
export class CategoriasService {

  urlcategorias: string = environment.serverCategorias;
  url_apiCross: string = environment.apiCrossUrl;
  errorMsg?: string;
  parametroMomentos: string = 'MV'

  constructor(private http: HttpClient) {

  }

  getCategorias(): Observable<CategoriasInterface[]> {
    return this.http.get<CategoriasInterface[]>(`${this.urlcategorias}Categorias/Categorias/TipoCategoria/${this.parametroMomentos}`)
      .pipe(
        catchError(error => {
          if (error.error instanceof ErrorEvent) {
            this.errorMsg = `Error: ${error.error.message}`
          }else {
            this.errorMsg = this.getServerErrorMessage(error)
          }
          return throwError(this.errorMsg)
        })
      );
  }
  
  getCategoriasPorId(id: string): Observable<CategoriasInterface[]> {
    return this.http.get<CategoriasInterface[]>(`${this.urlcategorias}CategoriasSubcategorias/Categoria/${id}`)
    .pipe(
      catchError(error => {
        if (error.error instanceof ErrorEvent) {
          this.errorMsg = `Error: ${error.error.message}`
        }else {
          this.errorMsg = this.getServerErrorMessage(error)
        }
        return throwError(this.errorMsg)
      })
    );
  }

  getTitleAndDescription(codigo: string) {
    let params = new HttpParams().set('codigo', codigo);
    return this.http.get<Momentos>(`${this.url_apiCross}cross/ObtenerTituloPagina`, { params })
    .pipe(
      catchError(error => {
        if (error.error instanceof ErrorEvent) {
          this.errorMsg = `Error: ${error.error.message}`
        }else {
          this.errorMsg = this.getServerErrorMessage(error)
        }
        return throwError(this.errorMsg)
      })
    );
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
