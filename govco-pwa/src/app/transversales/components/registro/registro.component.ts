import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from "@angular/forms";
import { authConfigRegister } from "../../../auth.config";
import { OAuthService } from "angular-oauth2-oidc";
import { environment } from "src/environments/environment";
import { TipoIdentificacionModel } from '../../models/auth/tipoidentificacion.model';
import { AuthService } from '../../services/auth/auth.service';

@Component({
  selector: 'app-registro',
  templateUrl: './registro.component.html',
  styleUrls: ['./registro.component.scss']
})
export class RegistroComponent implements OnInit {
  disable = true;
  errorCaptcha = false;
  submitted = false;
  users: TipoIdentificacionModel[];
  registrationForm: FormGroup;
  selectedID: string = "";
  siteKeyCaptcha: string = environment.keyCaptcha;



  constructor(public fb: FormBuilder,
    private oauthService: OAuthService,
    private authService: AuthService) { }

  ngOnInit() {
    this.authService.getTiposIdentificacionEventos().subscribe((data: TipoIdentificacionModel[]) => { // Success
      this.users = data;
    },
      (error) => {
        console.error(error);
      }
    );

    this.registrationForm = this.fb.group({
      user: ["", [Validators.required]],
      userID: ["CC", [Validators.required]],
      tratamiento: ["", [Validators.requiredTrue]],
      recaptcha: ["", [Validators.required]],
      terminos: ["", [Validators.requiredTrue]]
    });
  }

  getResponceCapcha(captchaResponse: string) {
    var response = captchaResponse;
    if (response.length == 0) {
      this.errorCaptcha = true;
      return false;
    } else if (response.length > 0) {
      this.registrationForm.get("recaptcha")?.setValue(captchaResponse);
      this.disable = false;
      this.errorCaptcha = false;
      return true;
    }
  }

  selectChangeHandler(event: any) {
    this.selectedID = event.target.value;
    if (this.registrationForm.get("userID")?.value == "EM") {
      this.registrationForm.controls["user"].setValidators([
        Validators.required,
        Validators.pattern("^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\\.[a-zA-Z]{2,4}")
      ]);
    } else {
      this.registrationForm.controls["user"].setValidators([
        Validators.required,
        Validators.pattern("^[0-9]*$"),
      ]);
    }
    this.registrationForm.controls.user.reset();
    this.registrationForm.controls.user.updateValueAndValidity();
  }

  get f() {
    return this.registrationForm.controls;
  }
  async validate() {
    this.submitted = true
    if (this.registrationForm.invalid) {
      this.registrationForm.markAllAsTouched();
    } else {
      if (this.f.userID.value == "EM") {
        authConfigRegister.customQueryParams = {
          acr_values: 'action:register loa:1 idp:SectorPublicoSchema',
          login_hint: this.f.userID.value + "," + this.f.user.value
        };

      }
      else if (this.f.userID.value == "CC" || this.f.userID.value == "CE") {
        authConfigRegister.customQueryParams = {
          acr_values: 'action:register loa:2 idp:SectorPublicoSchema',
          login_hint: this.f.userID.value + "," + this.f.user.value
        };
      }

      this.oauthService.configure(authConfigRegister);
      await this.oauthService.loadDiscoveryDocument();

      this.oauthService.initLoginFlow();
    }
  }

}
