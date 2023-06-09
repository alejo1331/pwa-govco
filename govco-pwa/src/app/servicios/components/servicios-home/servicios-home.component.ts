import { Component, OnInit } from '@angular/core';
import { AppService } from '../../../app.service';
import { Router } from '@angular/router';
import { BottomMenuService } from '../../../transversales/services/bottom-menu/bottom-menu.service';
import { HeaderService } from 'src/app/transversales/services/header-service/header.service';
import { SidenavService } from 'src/app/transversales/services/sidenav-service/sidenav-service.service';

@Component({
  selector: 'app-servicios-home',
  templateUrl: './servicios-home.component.html',
  styleUrls: ['./servicios-home.component.css']
})
export class ServiciosHomeComponent implements OnInit {

  anteriorUrl:any;
  itemSelected:number;
  urlItems = [
    "/",
    "https://carpetaciudadana.and.gov.co/",
    "/ficha-tramites-y-servicios/codigos-ciiu-y-tramites"
  ];

  constructor(
    public router: Router,
    public appService : AppService,
    public bottomService : BottomMenuService,
    protected servicioHeader: HeaderService,
    protected servicioSideNav: SidenavService
  ) {
    this.anteriorUrl = appService.currentUrl;
    this.itemSelected = appService.getSelectedServiceOption();
    this.bottomService.putOcultandoBottomMenu(false);
   }

  ngOnInit() {
    this.servicioHeader.estadoHeader(false,false);
    this.bottomService.seleccionandoItem(3);
    this.bottomService.ajustandoPantalla(true);
    this.servicioSideNav.seleccionandoItem(false,'null');
    (document.getElementById('topScroll') as HTMLElement).style.top = '0';
    (document.getElementById('topScroll') as HTMLElement).scrollTop = 0;
  }

  backUrl(){
    this.bottomService.quitarActive()
  }

  navigateTo(dataItem:number, target:string) {
    this.itemSelected = dataItem;
    this.appService.setSelectedServiceOption(this.itemSelected);
    let url = this.urlItems[this.itemSelected];
    console.log('url', url)
    setTimeout(() => {
        window.open(url, target);
    }, 100);
  }
}
