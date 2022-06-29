import { Component, HostListener, ViewChild, OnInit, AfterContentChecked } from '@angular/core';
import { MatSidenav, MatSidenavContent } from '@angular/material/sidenav';
import { SidenavService } from './transversales/services/sidenav-service/sidenav-service.service';
import { AppService } from './app.service';
import { Router, NavigationEnd } from '@angular/router';
import { filter } from 'rxjs/operators';
import { BarraSuperiorComponent } from './transversales/components/barra-superior/barra-superior.component';



@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})


export class AppComponent implements OnInit, AfterContentChecked {

  @ViewChild('sidenav') sidenav!: MatSidenav;
  @ViewChild(MatSidenavContent) sidenavcontent!: MatSidenavContent;
  @ViewChild(BarraSuperiorComponent) barraSuperior: any;
  @ViewChild(BarraSuperiorComponent) cambiarBarra: any;

  barraSuperiorGeneral: boolean = true;
  statusMenu: boolean = false;

  appGeolocalizacion: Element;
  appGeolocalizacionFormulario: any;


  touchMoveInicial: number = 0;
  touchMoveFinal: number = 0;
  touchMoveDiferencia: number = 0;




  title: string = 'govco-pwa';

  constructor(
    public appService: AppService,
    private router: Router,
    private sidenavService: SidenavService) {
    this.router.events
      .pipe(filter(event => event instanceof NavigationEnd))
      .subscribe((event: any) => {
        this.appService.previousUrl = this.appService.currentUrl;
        this.appService.currentUrl = event.url;
      });
  }

  ngOnInit(): void {
    this.appGeolocalizacion = document.getElementsByTagName("app-geolocalizacion")[0];
    this.appGeolocalizacionFormulario = (document.getElementsByTagName("app-geolocalizacion-formulario") as HTMLCollectionOf<HTMLElement>)[0].style;
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

  opcionBarraSuperiorInterna(opcion: boolean) {
    this.cambiarBarra.barraSuperiorInterna = opcion;
  }

  formularioGeolocalizacion(estadoDisplay: string) {
    this.appGeolocalizacionFormulario.display = estadoDisplay;
  }

  @HostListener('touchstart', ['$event']) onTouchStart(event: any): void {
    this.touchMoveInicial = event.changedTouches[0].screenY;
  }

  @HostListener('touchmove', ['$event']) onTouchMove(event: any): void {
    this.touchMoveFinal = event.changedTouches[0].screenY;
    if (this.touchMoveInicial < this.touchMoveFinal) {
      this.touchMoveDiferencia = this.touchMoveFinal - this.touchMoveInicial;
      if (this.touchMoveDiferencia >= 100) {
        this.appGeolocalizacion.classList.add("geolocalizacion-touch-abajo-pwa-govco");
      }
    } else {
      this.appGeolocalizacion.classList.remove("geolocalizacion-touch-abajo-pwa-govco");
    }
  }
}