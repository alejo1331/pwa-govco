import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from "@angular/forms";
import { OAuthService } from "angular-oauth2-oidc";
import { authConfig } from "../../../auth.config";
import { environment } from "src/environments/environment";
import { ActivatedRoute, Router } from "@angular/router";
import { AuthService } from '../../services/auth/auth.service';
import { TipoIdentificacionModel } from '../../models/auth/tipoidentificacion.model';
import { NgbModal } from "@ng-bootstrap/ng-bootstrap";
import { ModalInformacionComponent } from "../../shared/modal-informacion/modal-informacion.component";


@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {
  userProfile: object;
  disable = true;
  errorCaptcha = false;
  submitted = false;
  user = null;
  siteKeyCaptcha: string = environment.keyCaptcha;
  users: TipoIdentificacionModel[];
  registrationForm: FormGroup;
  selectedID: string = "CC";
  constructor(
    public fb: FormBuilder,
    private oauthService: OAuthService,
    private router: Router,
    private authService: AuthService,
    private activatedRoute: ActivatedRoute,
    private modalService: NgbModal) { }

  ngOnInit() {
    const mensaje = this.activatedRoute.snapshot.params['msg'];
    const detalle = this.activatedRoute.snapshot.params['detail'];

    if (mensaje && mensaje === 'access_denied') {
      this.open(detalle);
    }
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
      recaptcha: ["", [Validators.required]],
    });

    //En el portal solo se aceptará login por Cédula, por lo que se restringe a solo números el campo User
    this.registrationForm.controls["user"].setValidators([
      Validators.required,
      Validators.pattern("^[0-9]*$"),
    ]);

    var claims = this.oauthService.getIdentityClaims();
    if (claims) {
      // Si ya está autenticado con Documento de identidad
      if (claims['LOA'] == 'loa:2')
      {
       this.router.navigate(["/"]);
      }
    }
  }

  open(detalle: string) {
    const modalRef = this.modalService.open(ModalInformacionComponent, { windowClass: 'login-modal-error' });
    modalRef.componentInstance.detail = detalle;
  }

  getResponceCapcha(captchaResponse: string) {
    var response = captchaResponse;
    if (response.length == 0) {
      this.errorCaptcha = true;
      return false;
    } else if (response.length > 0) {
      this.registrationForm.get("recaptcha")!.setValue(captchaResponse);
      this.disable = false;
      this.errorCaptcha = false;
      return true;
    }
  }

  selectChangeHandler(event: any) {
    this.selectedID = event.target.value;
    if (this.registrationForm.get("userID")!.value == "EM") {
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

      var claims = this.oauthService.getIdentityClaims();

      if (claims)
      {
        if (claims['LOA'] == 'loa:1')
        {
          this.open("LoginLoa1");
        }
        else {

          authConfig.customQueryParams = {
            login_hint: this.f.userID.value + "," + this.f.user.value,
          };

          this.oauthService.configure(authConfig);
          this.oauthService.loadDiscoveryDocument();

          this.oauthService.initLoginFlow();
        }
      }
      else {
        authConfig.customQueryParams = {
          login_hint: this.f.userID.value + "," + this.f.user.value,
        };

        this.oauthService.configure(authConfig);
        this.oauthService.loadDiscoveryDocument();

        this.oauthService.initLoginFlow();
      }
    }
  }
}
