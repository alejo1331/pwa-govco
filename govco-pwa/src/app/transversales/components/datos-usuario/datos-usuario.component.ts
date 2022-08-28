import { Component, OnInit } from '@angular/core';
import { FormBuilder } from "@angular/forms";
import { OAuthService } from "angular-oauth2-oidc";
import { authConfig } from '../../../auth.config';

@Component({
  selector: 'app-datos-usuario',
  templateUrl: './datos-usuario.component.html',
  styleUrls: ['./datos-usuario.component.css']
})
export class DatosUsuarioComponent implements OnInit {
  userData:any;
  config:any;

  constructor(
    public fb: FormBuilder,
    private oauthService: OAuthService,
  ) { }

  ngOnInit() {
    var claims = this.oauthService.getIdentityClaims();
    if (claims) {
      // Si ya está autenticado con Documento de identidad
      this.userData = claims;

      this.config = this.userData.TipoIdentificacion + ',' + this.userData.Identificacion;

      this.oauthService.configure(authConfig);

      this.oauthService.loadDiscoveryDocument();

      this.oauthService.initLoginFlow();

      this.oauthService.customQueryParams = {

        acr_values: 'action:manage',

        login_hint: this.config,

      };
    }
  }

}
