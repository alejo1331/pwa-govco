import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/internal/Observable';
import { environment } from 'src/environments/environment';
import { TipoIdentificacionModel } from '../../models/auth/tipoidentificacion.model';
import { UsuarioLoginModel } from '../../models/auth/usuarioLogin.model';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  url_auth: string = environment.authWebApi;

  constructor(private http: HttpClient) { }

  createUsuarioLogin(usuarioLogin: UsuarioLoginModel) {
    return this.http.post(`${this.url_auth}/RegistrarLogin`, usuarioLogin);
  }

  getTiposIdentificacionEventos():Observable<TipoIdentificacionModel[]>{
    return this.http.get<TipoIdentificacionModel[]>(`${this.url_auth}/ObtenerTiposIdentificacion`);
    }

}
