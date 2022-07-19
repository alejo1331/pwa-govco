import { Component, HostListener, ViewChild, OnInit, AfterContentChecked, ElementRef } from '@angular/core';
import { MatSidenav, MatSidenavContent } from '@angular/material/sidenav';
import { SidenavService } from './transversales/services/sidenav-service/sidenav-service.service';
import { AppService } from './app.service';
import { Router, NavigationEnd } from '@angular/router';
import { filter } from 'rxjs/operators';
import { BarraSuperiorComponent } from './transversales/components/barra-superior/barra-superior.component';
import { GeolocalizacionFormularioComponent } from './transversales/components/geolocalizacion-formulario/geolocalizacion-formulario.component';



@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})


export class AppComponent implements OnInit, AfterContentChecked {

  @ViewChild('sidenav') sidenav!: MatSidenav;
  @ViewChild(MatSidenavContent) sidenavcontent!: MatSidenavContent;
  @ViewChild(BarraSuperiorComponent) barraSuperior: any;
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
    private sidenavService: SidenavService) {
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

  opcionBarraSuperiorInterna(opcion: boolean) {
    this.barraSuperior.barraSuperiorInterna = opcion;
    if(opcion === true){
      this.appGeolocalizacion.transition = '0s'
      this.appGeolocalizacion.top = '3.5em';
    }
    else{
      this.appGeolocalizacion.top = '7.25em';
    }

  }

  formularioGeolocalizacion(modalAndContect: string[]) {
    this.appGeolocalizacionFormulario.transition = '0.6s';
    this.appGeolocalizacionFormulario.transform = modalAndContect[0];
    this.matSidenavContent.transition = '0.6s';
    this.matSidenavContent.transform = modalAndContect[1];
  }

  @HostListener('touchstart', ['$event']) onTouchStart(event: any): void {
    this.touchMoveInicial = event.changedTouches[0].screenY;
  }

  @HostListener('touchmove', ['$event']) onTouchMove(event: any): void {
    this.touchMoveFinal = event.changedTouches[0].screenY;
    this.appGeolocalizacion.transition = '0.6s'
    if (this.touchMoveInicial < this.touchMoveFinal) {
      this.touchMoveDiferencia = this.touchMoveFinal - this.touchMoveInicial;
      if (this.touchMoveDiferencia >= 50) {
        if(this.barraSuperior.barraSuperiorInterna === true){
          this.appGeolocalizacion.top = '3.5em';
        }
        else
          this.appGeolocalizacion.top = '7.25em';
      }
    } else {
      if(this.barraSuperior.barraSuperiorInterna === true){
        this.appGeolocalizacion.top = '1.25em';
      }
      else
        this.appGeolocalizacion.top = '5em';
    }
  }
}
