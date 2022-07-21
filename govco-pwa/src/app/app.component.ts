import { Component, HostListener, ViewChild, OnInit, AfterContentChecked} from '@angular/core';
import { MatSidenav, MatSidenavContent } from '@angular/material/sidenav';
import { SidenavService } from './transversales/services/sidenav-service/sidenav-service.service';
import { AppService } from './app.service';
import { Router, NavigationEnd } from '@angular/router';
import { filter } from 'rxjs/operators';
import { BarraSuperiorComponent } from './transversales/components/barra-superior/barra-superior.component';
import { GeolocalizacionFormularioComponent } from './transversales/components/geolocalizacion-formulario/geolocalizacion-formulario.component';
import { GeolocalizacionComponent } from './transversales/components/geolocalizacion/geolocalizacion.component';
import { HeaderService } from './transversales/services/header-service/header.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})

export class AppComponent implements OnInit, AfterContentChecked {

  @ViewChild('sidenav') sidenav!: MatSidenav;
  @ViewChild(MatSidenavContent) sidenavcontent!: MatSidenavContent;
  @ViewChild(BarraSuperiorComponent) barraSuperior: any;
  @ViewChild(GeolocalizacionComponent) barraGeolocalizacion: any;
  @ViewChild(GeolocalizacionFormularioComponent) activarGps: any;

  barraSuperiorGeneral: boolean = true;
  statusMenu: boolean = false;

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
    protected servicioHeader: HeaderService) {
    this.router.events
      .pipe(filter(event => event instanceof NavigationEnd))
      .subscribe((event: any) => {
        document.querySelector('#topScroll')!.scrollTop = 0
        this.appService.previousUrl = this.appService.currentUrl;
        this.appService.currentUrl = event.url;
      });
  }

  ngOnInit(): void {
    this.appGeolocalizacion = (document.getElementsByTagName("app-geolocalizacion") as HTMLCollectionOf<HTMLElement>)[0].style;
    this.appGeolocalizacionFormulario = (document.getElementsByTagName("app-geolocalizacion-formulario") as HTMLCollectionOf<HTMLElement>)[0].style;
    this.matSidenavContent = (document.getElementsByTagName("mat-sidenav-container") as HTMLCollectionOf<HTMLElement>)[0].style;
  }

  ngAfterContentChecked(): void {
    this.sidenavService.setSidnav(this.sidenav)
  }

  estadoMenu(estado: boolean) {
    this.statusMenu = estado;
    if (estado == true) {
      this.sidenav.opened = true;
    }
    else {
      this.sidenav.opened = false;
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
    switch (estilo) {
      case true:
        this.appGeolocalizacion.transition = '0s'
        this.appGeolocalizacion.top = '3.5em';
        break;
      case false:
        this.appGeolocalizacion.top = '7.25em';
        break;
    }
  }

  @HostListener('touchstart', ['$event']) onTouchStart(event: any): void {
    this.touchMoveInicial = event.changedTouches[0].screenY;
  }

  @HostListener('touchmove', ['$event']) onTouchMove(event: any): void {
    this.touchMoveFinal = event.changedTouches[0].screenY;
    this.servicioHeader.ocultandoHeader.subscribe(([estilo, estado]) => {
      this.appGeolocalizacion.transition = '0.6s'
      if (this.touchMoveInicial < this.touchMoveFinal) {
        this.touchMoveDiferencia = this.touchMoveFinal - this.touchMoveInicial;
        if (this.touchMoveDiferencia >= 50) {
          switch (estilo) {
            case true:
              this.appGeolocalizacion.top = '3.5em';
              break;
            case false:
              this.appGeolocalizacion.top = '7.25em';
              break;
          }
        }
      } else {
        switch (estilo) {
          case true:
            this.appGeolocalizacion.top = '1.25em';
            break;
          case false:
            this.appGeolocalizacion.top = '5em';
            break;
        }
      }
    })
  }
}
