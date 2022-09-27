import { Component, OnDestroy, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from "@angular/forms";
import { authConfigRegister } from "../../../auth.config";
import { OAuthService } from "angular-oauth2-oidc";
import { environment } from "src/environments/environment";
import { TipoIdentificacionModel } from '../../models/auth/tipoidentificacion.model';
import { AuthService } from '../../services/auth/auth.service';
import { SidenavService } from '../../services/sidenav-service/sidenav-service.service';
import { HeaderService } from '../../services/header-service/header.service';
import { BottomMenuService } from '../../services/bottom-menu/bottom-menu.service';

@Component({
  selector: 'app-registro',
  templateUrl: './registro.component.html',
  styleUrls: ['./registro.component.scss']
})
export class RegistroComponent implements OnInit, OnDestroy {
  disable = true;
  errorCaptcha = false;
  submitted = false;
  users: TipoIdentificacionModel[];
  registrationForm: FormGroup;
  selectedID: string = "";
  siteKeyCaptcha: string = environment.keyCaptcha;



  constructor(public fb: FormBuilder,
    private oauthService: OAuthService,
    private authService: AuthService,
    public bottomService: BottomMenuService,
    protected servicioHeader: HeaderService,
    protected servicioSideNav: SidenavService
    ) { }

  ngOnInit() {
    // servicioHeader.estadoHeader(a, b)       a -> true = header seccion internas
    //                                         a -> false = header general
    //                                         b -> Muestra/Oculta  Header
    //bottomService.seleccionandoItem(0)       0 -> Activa boton incio del menu inferior
    //                                         1, 2, 3 -> Tramites, Ingresa
    //servicioSideNav.seleccionandoItem(a, b)  a -> Activa o inactiva menu lateral
    //                                         b -> String con el valor del item a seleccionar
    //bottomService.ajustandoPantalla(true)    true -> Agrega clase de css para ajustar
    //                                                 la pantalla cuando en la seccion
    //                                                 consultada no tiene header
    this.servicioHeader.estadoHeader(false, true);
    this.bottomService.putOcultandoBottomMenu(false);
    this.bottomService.seleccionandoItem(2);
    this.bottomService.ajustandoPantalla(false);
    this.servicioSideNav.seleccionandoItem(false, 'null');
    (document.getElementById('topScroll') as HTMLElement).style.top = '7.25rem';
    (document.getElementById('topScroll') as HTMLElement).scrollTop = 0

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

  ngOnDestroy() {
    const modals = document.querySelectorAll('.modal .modal-header .close');
    console.log(modals)
    modals.forEach(modal => (<HTMLElement>modal).click());
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
