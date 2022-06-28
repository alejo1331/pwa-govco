import { Component, ViewChild } from '@angular/core';
import { MatSidenav, MatSidenavContent } from '@angular/material/sidenav';
import { SidenavService } from './transversales/services/sidenav-service/sidenav-service.service';
import { AppService } from './app.service';
import {Router, NavigationEnd} from '@angular/router';
import {filter} from 'rxjs/operators';
import { BarraSuperiorComponent } from './transversales/components/barra-superior/barra-superior.component';



@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})


export class AppComponent {

  @ViewChild( 'sidenav' ) sidenav!: MatSidenav;
  @ViewChild( MatSidenavContent ) sidenavcontent!: MatSidenavContent;
  @ViewChild( BarraSuperiorComponent ) barraSuperior : any;
  @ViewChild( BarraSuperiorComponent ) cambiarBarra : any;

  barraSuperiorGeneral :boolean = true;

  statusMenu:boolean = false;

  title: string = 'govco-pwa';

  constructor(
    public appService: AppService,
    private router: Router,
    private sidenavService : SidenavService){
      this.router.events
      .pipe(filter(event => event instanceof NavigationEnd))
      .subscribe((event: any) => {
      this.appService.previousUrl= this.appService.currentUrl;
      this.appService.currentUrl = event.url;
      });
    }

  ngAfterContentChecked(): void {
    this.sidenavService.setSidnav(this.sidenav)
  }

  estadoMenu(estado:boolean){
    this.statusMenu = estado;
    if(estado == true){
      this.sidenav.opened = true;
    }
    else {
      this.sidenav.opened = false;
    }
  }

  estadoSideNav(sideNav:any){
    this.barraSuperior.onClickMenu();
  }

  opcionBarraSuperiorInterna(opcion:boolean){
    this.cambiarBarra.barraSuperiorInterna = opcion;
  }
}
