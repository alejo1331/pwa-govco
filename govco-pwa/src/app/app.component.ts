import { Component, HostListener, ViewChild, OnInit, AfterContentChecked, ElementRef } from '@angular/core';
import { MatSidenav, MatSidenavContent } from '@angular/material/sidenav';
import { SidenavService } from './transversales/services/sidenav-service/sidenav-service.service';
import { AppService } from './app.service';
import { Router, NavigationEnd } from '@angular/router';
import { filter } from 'rxjs/operators';
import { BarraSuperiorComponent } from './transversales/components/barra-superior/barra-superior.component';
import { HeaderService } from './transversales/services/header-service/header.service';
import { BottomMenuService } from './transversales/services/bottom-menu/bottom-menu.service';
import { Platform } from '@angular/cdk/platform';
import { GeolocalizacionService } from './transversales/services/geolocalizacion/geolocalizacion.service';
import { GeolocalizacionFormularioComponent } from './transversales/components/geolocalizacion-formulario/geolocalizacion-formulario.component';
import { SwUpdate } from '@angular/service-worker';
import { MatDialog } from '@angular/material/dialog';
import { ModalClasicoComponent } from './modal-natvivo/components/modal-clasico/modal-clasico.component';
import { ModalService } from './modal-natvivo/services/modal.service';
import { ModalInterface } from './modal-natvivo/models/modal-interface';
import { OidcService } from './transversales/services/oidc/oidc.service';
import { OAuthService, OAuthErrorEvent } from 'angular-oauth2-oidc';
import { Observable } from 'rxjs';
import { UsuarioModel } from './transversales/models/auth/usuario.model';
import { UsuarioLoginModel } from './transversales/models/auth/usuarioLogin.model';
import { AuthService } from './transversales/services/auth/auth.service';
import { GeolocalizacionComponent } from './transversales/components/geolocalizacion/geolocalizacion.component';
import { BuscadorService } from './buscador-pwa/services/buscador.service';
import { BuscadorNivelDosComponent } from './buscador-pwa/components/buscador-nivel-dos/buscador-nivel-dos.component';


export interface OAuthErrorEventParams {
  error: string;
  error_description: string;
  state: string;
}

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
})
export class AppComponent implements OnInit, AfterContentChecked, AfterContentChecked {
  isAuthenticated: Observable<boolean>;
  isDoneLoading: Observable<boolean>;
  canActivateProtectedRoutes: Observable<boolean>;
  userName: any;
  userProfile: object;

  @ViewChild('sidenav') sidenav!: MatSidenav;
  @ViewChild(MatSidenavContent) sidenavcontent!: MatSidenavContent;
  @ViewChild(BarraSuperiorComponent) barraSuperior: BarraSuperiorComponent;
  @ViewChild(GeolocalizacionFormularioComponent) formularioGeolocalizador: GeolocalizacionFormularioComponent;
  @ViewChild(GeolocalizacionComponent) GeolocalizacionComponent: GeolocalizacionComponent;
  @ViewChild('formulario') appGeolocalizacionFormulario: ElementRef;
  @ViewChild('seccionBuscador') seccionBuscador: ElementRef;
  @ViewChild(BuscadorNivelDosComponent) buscadorNivelDos: BuscadorNivelDosComponent;


  barraSuperiorGeneral: boolean = true;
  statusMenu: boolean = false;
  cambiarEstilo: boolean = false;

  matSidenavContent: any;
  appGeolocalizacion: HTMLElement;

  touchMoveInicial: number = 0;
  touchMoveFinal: number = 0;
  touchMoveDiferencia: number = 0;

  modalClasico: ModalInterface;

  prueba: any;

  abrirBuscadorCheck: boolean = false;
  ulitmoEstadoBuscador: boolean = false;

  public parametroBuscador: string;
  title: string = 'govco-pwa';

  constructor(
    public appService: AppService,
    private router: Router,
    private sidenavService: SidenavService,
    protected servicioHeader: HeaderService,
    public bottomService: BottomMenuService,
    public platform: Platform,
    protected ServicioGeolocalizacion: GeolocalizacionService,
    private swUpdate: SwUpdate,
    public dialog: MatDialog,
    protected modalService: ModalService,
    private oidcService: OidcService,
    private oauthService: OAuthService,
    private authService: AuthService,
    private buscadorService: BuscadorService
  ) {
    this.isAuthenticated = this.oidcService.isAuthenticated$;
    this.isDoneLoading = this.oidcService.isDoneLoading$;
    this.canActivateProtectedRoutes =
      this.oidcService.canActivateProtectedRoutes$;

    this.oauthService.events.subscribe((e) => {
      if (e instanceof OAuthErrorEvent) {
        const parm = e.params as OAuthErrorEventParams;
        if (parm?.error == 'login_required') {
          //TODO : limpiar username
          this.clearSessionData();

          this.userName = null;
        } else if (parm?.error == 'access_denied') {
          this.router.navigate([
            '/login',
            { msg: parm.error, detail: parm.error_description },
          ]);
        }
        console.debug(e);
      } else {
        console.debug(e);
      }
    });

    this.oidcService.runInitialLoginSequence();

    this.oauthService.loadDiscoveryDocumentAndTryLogin().then((_) => {
      var claims = this.oauthService.getIdentityClaims();
      if (claims) {
        if (claims['LOA'] == 'loa:2') {
          this.LoginGovCo(claims);
          console.log(this.LoginGovCo);
          this.userName = claims['name'];
          console.log(`${this.userName} datos desde el claims[name]`);
          this.notifyLoginChange();
        }
      }
    });

    this.router.events
      .pipe(filter((event) => event instanceof NavigationEnd))
      .subscribe((event: any) => {
        this.appService.previousUrl = this.appService.currentUrl;
        this.appService.currentUrl = event.url;
      });
    this.bottomService.ajustePantalla.subscribe((estado) => {
      this.cambiarEstilo = estado;
    });
    this.modalService.siguienteModal.subscribe((estado) => {
      if (estado == true) {
        this.updatePWA();
      }
    });
  }

  notifyLoginChange() {
    this.bottomService.notifyLogin();
  }

  clearSessionData() {
    localStorage.removeItem('_grecaptcha');
    localStorage.removeItem('PKCE_verifier');
    localStorage.removeItem('nonce');
    localStorage.removeItem('session_state');
    localStorage.removeItem('_hjid');
    localStorage.removeItem('access_token');
    localStorage.removeItem('granted_scopes');
    localStorage.removeItem('access_token_stored_at');
    localStorage.removeItem('expires_at');
    localStorage.removeItem('id_token');
    localStorage.removeItem('id_token_claims_obj');
    localStorage.removeItem('id_token_expires_at');
    localStorage.removeItem('id_token_stored_at');
  }

  login() {
    this.oidcService.login();
  }
  logout() {
    this.oidcService.logout();
  }
  refresh() {
    this.oidcService.refresh();
  }
  reload() {
    window.location.reload();
  }
  clearStorage() {
    localStorage.clear();
  }

  logoutExternally() {
    window.open(this.oidcService.logoutUrl);
  }

  get hasValidToken() {
    return this.oidcService.hasValidToken();
  }
  get accessToken() {
    return this.oidcService.accessToken;
  }
  get refreshToken() {
    return this.oidcService.refreshToken;
  }
  get identityClaims() {
    return this.oidcService.identityClaims;
  }
  get idToken() {
    return this.oidcService.idToken;
  }

  ngOnInit(): void {
    // Suscribe al componente de abrir elbuscador
    this.buscadorService.getAbrirBuscador$.subscribe(
      (abrir: boolean) => {
        this.abrirBuscadorCheck = abrir
        if (this.abrirBuscadorCheck == true) {
          this.abrirBuscadorPWA()
        }
        else if (this.abrirBuscadorCheck == false && this.ulitmoEstadoBuscador == true) {
          this.cerrarBuscadorPWA()
        }
      })
  }

  loadUserProfile(): void {
    this.oauthService.loadUserProfile().then((up) => (this.userProfile = up));
  }

  LoginGovCo(claims: object) {
    try {
      const usuario: UsuarioModel = {
        NombreUsuario: claims['name'],
        Documento:
          claims['Identificacion'] != null ? claims['Identificacion'] : '',
        Direccion: claims['Direccion'] != null ? claims['Direccion'] : '',
        PrimerApellido:
          claims['PrimerApellido'] != null ? claims['PrimerApellido'] : '',
        PrimerNombre:
          claims['PrimerNombre'] != null ? claims['PrimerNombre'] : '',
        SegundoNombre:
          claims['SegundoNombre'] != null ? claims['SegundoNombre'] : '',
        Correo: claims['email'],
        Telefono: claims['Telefono'] != null ? claims['Telefono'] : 0,
      };

      const usuarioLogin: UsuarioLoginModel = {
        usuario: usuario,
        TipoIdentificacion:
          claims['TipoIdentificacion'] != null
            ? claims['TipoIdentificacion']
            : 'EM',
      };

      this.authService.createUsuarioLogin(usuarioLogin);
    } catch {
      console.log('error auth api');
    }
  }

  ngAfterContentChecked(): void {
    this.sidenavService.setSidnav(this.sidenav);
  }

  updatePWA() {
    //inicio - contruccion modal natico clasico
    this.modalClasico = {
      campoTitulo: 'Actualización',
      campoTexto: 'Nueva versión de GOV.CO disponible.',
      botonCancelar: 'CANCELAR',
      botonAceptar: 'ACTUALIZAR',
    };
    this.modalService.clasico(this.modalClasico);
    //fin - contruccion modal natico clasico

    const modalVisto = sessionStorage.getItem('modalVisto');

    if (modalVisto == 'true') {
      if (this.swUpdate.isEnabled) {
        this.swUpdate.available.subscribe(() => {
          let respuestaModalClasico = this.dialog.open(ModalClasicoComponent, {
            width: '280px',
          });
          respuestaModalClasico.afterClosed().subscribe((resultado) => {
            if (resultado == true) {
              this.swUpdate
                .activateUpdate()
                .then(() => window.location.reload());
            }
          });
        });
      }
    }
  }

  estadoMenu(estado: boolean) {
    this.statusMenu = estado;
    const bottomMenu = document.querySelector(
      '.govco-pwa-bottom-menu'
    ) as HTMLElement;
    if (estado == true) {
      this.sidenav.opened = true;
      bottomMenu.style.borderBottomLeftRadius = '20px';
      bottomMenu.style.transition = '0.6s';
      bottomMenu.style.boxShadow = '#3366CC -6px 6px';
    } else {
      this.sidenav.opened = false;
      bottomMenu.style.borderBottomLeftRadius = '0';
      bottomMenu.style.boxShadow = 'none';
    }
  }

  estadoSideNav(sideNav: any) {
    this.barraSuperior.onClickMenu();
  }

  formularioGeolocalizacion(modalAndContect: string[]) {
    modalAndContect[0] == "translate(100%)" ?
      this.GeolocalizacionComponent.contenidoHtml.nativeElement.focus()
      : this.formularioGeolocalizador.botonAtras.nativeElement.focus();
    this.appGeolocalizacionFormulario.nativeElement.style.transform = modalAndContect[0];
    this.matSidenavContent.transform = modalAndContect[1];
    this.formularioGeolocalizador.abrirFormulario();
  }

  @HostListener('window:load') onLoad() {
    if (this.GeolocalizacionComponent != undefined) {
      this.appGeolocalizacion = this.GeolocalizacionComponent.contenidoHtml.nativeElement;
    }
    this.matSidenavContent = (
      document.getElementsByTagName('mat-sidenav-container') as HTMLCollectionOf<HTMLElement>
    )[0].style;
  }

  @HostListener('touchstart', ['$event']) onTouchStart(event: any): void {
    this.touchMoveInicial = event.changedTouches[0].screenY;
    if (this.appGeolocalizacion != undefined) {
      this.router.url == '/buscar-pwa' ?
        (this.appGeolocalizacion.removeAttribute('style'),
          this.appGeolocalizacion.classList.add('fixed'))
        : this.appGeolocalizacion.classList.remove('fixed')
    }
  }

  @HostListener('touchmove', ['$event']) onTouchMove(event: any): void {
    if (this.router.url != '/buscar-pwa') {
      if (this.appGeolocalizacion != undefined) {
        this.touchMoveFinal = event.changedTouches[0].screenY;
        if (this.touchMoveInicial < this.touchMoveFinal) {
          this.touchMoveDiferencia = this.touchMoveFinal - this.touchMoveInicial;
          if (this.touchMoveDiferencia >= 50) {
            this.appGeolocalizacion.style.top = '0rem';
          }
        } else {
          this.appGeolocalizacion.style.top = '-2.25rem';
        }
      }
    }

    // solucion redireccionamiento slide
    var id_temas_de_interes: HTMLElement = (document.getElementsByTagName('temas-de-interes') as HTMLCollectionOf<HTMLElement>)[0];
    if (id_temas_de_interes != undefined || id_temas_de_interes != null) {
      var etiqueta_a = Array.from(id_temas_de_interes.getElementsByTagName('a') as HTMLCollectionOf<HTMLElement>);
      var get_href: String = '', ventanillas: number, portales: number
      etiqueta_a.forEach(element => {
        get_href = String(element.getAttribute('href'))
        ventanillas = get_href.indexOf('/ventanillas-unicas');
        portales = get_href.indexOf('/portales');
        if (ventanillas >= 0) {
          element.removeAttribute('href');
          element.removeAttribute('target');
        }
        if (portales >= 0) {
          element.removeAttribute('href');
          element.removeAttribute('target');
        }
      });
    }
    // Fin solucion redireccionamiento slide
  }

  @HostListener('document:mousewheel', ['$event']) onMousedown(event: any) {
    if (this.appGeolocalizacion != undefined) {
      this.router.url == '/buscar-pwa' ?
        (this.appGeolocalizacion.removeAttribute('style'),
          this.appGeolocalizacion.classList.add('fixed'))
        : this.appGeolocalizacion.classList.remove('fixed')
    }
  }

  // solucion redireccionamiento slide
  @HostListener('click', ['$event']) onClick(event: Event) {
    var id_temas_de_interes: HTMLElement = (document.getElementById('temas-de-interes') as HTMLElement);
    if (id_temas_de_interes != undefined || id_temas_de_interes != null) {
      var slide_activo: HTMLElement = id_temas_de_interes.querySelector('.contenedor-img.activo') as HTMLElement;
      var etiqueta_a: HTMLAnchorElement = (slide_activo.getElementsByTagName('a') as HTMLCollectionOf<HTMLAnchorElement>)[0];
      let get_href = String((<HTMLElement>etiqueta_a).getAttribute('aria-label'));
      let ventanillas: number = get_href.indexOf('Ventanillas Únicas');
      let portales: number = get_href.indexOf('Portales');

      var hijo_1: HTMLElement = etiqueta_a.querySelector('.descripcion-span') as HTMLElement;
      var hijo_2: HTMLElement = etiqueta_a.querySelector('.titulo-span') as HTMLElement;
      var hijo_3: HTMLElement = etiqueta_a.querySelector('.titulo-block ') as HTMLElement;
      if (event.target == hijo_1 || event.target == hijo_2 || event.target == hijo_3) {
        if (ventanillas >= 0) {
          this.router.navigate(['/ventanillas-unicas']);
        }
        if (portales >= 0) {
          this.router.navigate(['/portales']);
        }
      }
    }
  }

  // Función para abrir el buscador
  abrirBuscadorPWA() {
    this.seccionBuscador.nativeElement.style.transform = 'translate(0%)';
    this.matSidenavContent.transform = 'translate(-100%)';
    this.ulitmoEstadoBuscador = true;

  }

  // Función para cerrar el buscador
  cerrarBuscadorPWA() {
    this.seccionBuscador.nativeElement.style.transform = 'translate(100%)';
    this.matSidenavContent.transform = 'translate(0%)';
    this.ulitmoEstadoBuscador = false;
  }
}
