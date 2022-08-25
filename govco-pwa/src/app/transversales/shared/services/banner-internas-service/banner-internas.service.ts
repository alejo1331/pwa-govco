import { HttpClient, HttpErrorResponse, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { environment } from 'src/environments/environment';
import { BannerInternasInterface } from '../../models/banner-internas-models/banner-internas-interface';

@Injectable({
  providedIn: 'root'
})
export class BannerInternasService {

  url_apiCross: string = environment.apiCrossUrl;
  errorMsg?: string;

  constructor(private http: HttpClient) { }

  getTitleAndDescription(codigo: string) {
    let params = new HttpParams().set('codigo', codigo);
    return this.http.get<BannerInternasInterface>(`${this.url_apiCross}cross/ObtenerTituloPagina`, { params })
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
