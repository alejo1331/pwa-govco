import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { MatDialog } from '@angular/material/dialog';
import { ModalErrorUrlComponent } from 'src/app/biblioteca-pwa/components/modal-error-url/modal-error-url.component';
import { timeout } from 'rxjs/operators';

const API_URL = environment.serverValidateUrl;

@Injectable({
  providedIn: 'root'
})
export class ValidateUrlService {

  constructor(
    private http: HttpClient,
    public dialog: MatDialog
  ) { }

  private getGeneric<T>(endPoint: string, parameters: string = '') {
    return this.http.get<T>(`${API_URL}${endPoint}${parameters}`, {headers: new HttpHeaders().append('angular-show-loading', 'true')})
    .pipe(
      timeout(3000)
    );
  }

  validate(url: string) {
    console.log(url)
    return this.getGeneric<boolean>('?url=', encodeURIComponent(url));
  }

  validateUrl(url: string) {
    this.validate(url)
    .subscribe((data: boolean) => {
        if (data) {

            window.open(url, "target='_blank'");
        } else {
            this.dialog.open(ModalErrorUrlComponent, {
              width: '280px'
            });
        }
    }, error => {
      this.dialog.open(ModalErrorUrlComponent, {
        width: '280px'
      });
    });
  }
}
