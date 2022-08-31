import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { environment } from 'src/environments/environment';
import { UtilsService } from './utils.service';


const API_URL = environment.serverValidateUrl;

@Injectable({
  providedIn: 'root'
})
export class ValidateUrlService {

  constructor(private http: HttpClient, private utilsService: UtilsService) { }

  private getGeneric<T>(endPoint: string, parameters: string = '') {
    return this.http.get<T>(`${API_URL}${endPoint}${parameters}`, {headers: new HttpHeaders().append('angular-show-loading', 'true')});
  }

  validate(url: string) {
    return this.getGeneric<boolean>('?url=', encodeURIComponent(url));
  }

  validateUrl(url: string) {
    this.validate(url)
        .subscribe((data: boolean) => {
          if (data) {
            window.open(url, "target='_blank'");
          } else {
            this.utilsService.openModalErrorValidateUrl();
          }
        });
  }
}
