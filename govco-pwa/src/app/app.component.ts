import { Component, HostListener, ViewChild, OnInit, AfterContentChecked} from '@angular/core';
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

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})

export class AppComponent implements OnInit, AfterContentChecked {

  @ViewChild('sidenav') sidenav!: MatSidenav;
  @ViewChild(MatSidenavContent) sidenavcontent!: MatSidenavContent;
  @ViewChild(BarraSuperiorComponent) barraSuperior: any;

  barraSuperiorGeneral: boolean = true;
  statusMenu: boolean = false;
  cambiarEstilo: boolean = false;

  matSidenavContent: any;
  appGeolocalizacion: any;
  appGeolocalizacionFormulario: any;

  touchMoveInicial: number = 0;
  touchMoveFinal: number = 0;
  touchMoveDiferencia: number = 0;

  prueba: any;

  public parametroBuscador: string;
  title: string = 'govco-pwa';

  constructor(
    public appService: AppService,
    private router: Router,
    private sidenavService: SidenavService,
    protected servicioHeader: HeaderService,
    public bottomService: BottomMenuService,
    public platform: Platform,
    protected ServicioGeolocalizacion: GeolocalizacionService
  ) {
    this.router.events
      .pipe(filter(event => event instanceof NavigationEnd))
      .subscribe((event: any) => {
        document.querySelector('#topScroll')!.scrollTop = 0
        this.appService.previousUrl = this.appService.currentUrl;
        this.appService.currentUrl = event.url;
      });
    setTimeout(() => {
      this.bottomService.ajustePantalla.subscribe(estado => {
        this.cambiarEstilo = estado;
      })
    }, 100);
  }

  ngOnInit(): void {
    this.appGeolocalizacion = (document.getElementsByTagName("app-geolocalizacion") as HTMLCollectionOf<HTMLElement>)[0].style;
    this.appGeolocalizacionFormulario = (document.getElementsByTagName("app-geolocalizacion-formulario") as HTMLCollectionOf<HTMLElement>)[0].style;
    this.matSidenavContent = (document.getElementsByTagName("mat-sidenav-container") as HTMLCollectionOf<HTMLElement>)[0].style;
  }

  ngAfterContentChecked(): void {
    this.sidenavService.setSidnav(this.sidenav);
  }

  estadoMenu(estado: boolean) {
    this.statusMenu = estado;
    const bottomMenu = document.querySelector('.govco-pwa-bottom-menu') as HTMLElement;
    if (estado == true) {
      this.sidenav.opened = true;
      bottomMenu.style.borderBottomLeftRadius = '20px';
      bottomMenu.style.transition = '0.6s'
      bottomMenu.style.boxShadow = '#3366CC -6px 6px';
    }
    else {
      this.sidenav.opened = false;
      bottomMenu.style.borderBottomLeftRadius = '0';
      bottomMenu.style.boxShadow = 'none';
    }
  }

  estadoSideNav(sideNav: any) {
    this.barraSuperior.onClickMenu();
  }

  formularioGeolocalizacion(modalAndContect: string[]) {
    this.appGeolocalizacionFormulario.transition = '0.6s';
    this.appGeolocalizacionFormulario.transform = modalAndContect[0];
    this.matSidenavContent.transition = '0.6s';
    this.matSidenavContent.transform = modalAndContect[1];
  }

  estadoEfectoTransicion(estilo: boolean) {
    this.appGeolocalizacion.transition = '0s'
    this.appGeolocalizacion.top = '0em';
  }

  @HostListener('touchstart', ['$event']) onTouchStart(event: any): void {
    this.touchMoveInicial = event.changedTouches[0].screenY;
  }

  @HostListener('touchmove', ['$event']) onTouchMove(event: any): void {
    const posicionInicial = this.touchMoveInicial;
    this.touchMoveFinal = event.changedTouches[0].screenY;
      if (this.platform.IOS || this.platform.SAFARI){
          this.touchMoveInicial = posicionInicial;
          this.appGeolocalizacion = (document.getElementsByClassName("barra-geolocalizacion-pwa-govco") as HTMLCollectionOf<HTMLElement>)[0].style;
          this.appGeolocalizacion.position = 'sticky';
      }
      this.appGeolocalizacion.transition = '0.6s';
    if (this.touchMoveInicial < this.touchMoveFinal) {
      this.touchMoveDiferencia = this.touchMoveFinal - this.touchMoveInicial;
      if (this.touchMoveDiferencia >= 50) {
        this.appGeolocalizacion.top = '0rem';
      }
    } else {
      this.appGeolocalizacion.top = '-2.25rem';
    }
  }
}

