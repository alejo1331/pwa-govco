import { HttpBackend, HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import Menu from 'src/app/biblioteca/shared/models/menu';
import { UtilsService } from 'src/app/biblioteca/shared/utils/utils.service';
import { environment } from 'src/environments/environment';

const API_URL_BIBLIOTECA = environment.serverBiblioteca;

@Injectable({
  providedIn: 'root'
})
export class MenuService {

  constructor(private http: HttpClient,
    private utilsService: UtilsService,private httpClient: HttpClient, handler: HttpBackend) {
      this.httpClient = new HttpClient(handler);
    }

  getMenu(): Observable<Menu[]> {
    return this.http.get<Menu[]>(`${API_URL_BIBLIOTECA}menu`)
    .pipe(
      map((data) => {
        this.utilsService.newItem(data);
        return data;
      })
    );
  }

  getArbol(): Observable<any> {
    return this.httpClient.get<any>(`${API_URL_BIBLIOTECA}SeccionNivelUno/ObtenerArbolBiblioteca`);
  }
}
