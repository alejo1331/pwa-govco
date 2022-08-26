import { Component, OnInit } from '@angular/core';
import { AppService } from '../../../app.service';
import { Router, RoutesRecognized } from '@angular/router';
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
    "https://www.gov.co/home/",
    "https://carpetaciudadana.and.gov.co/",
    "/tramites/codigos-ciiu-y-tramites"
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
   }

  ngOnInit() {
    this.servicioHeader.estadoHeader(false,false);
    this.bottomService.seleccionandoItem(3);
    this.bottomService.ajustandoPantalla(true);
    this.servicioSideNav.seleccionandoItem(false,'null');
  }

  backUrl(){
    this.bottomService.quitarActive()
  }

  navigateTo(dataItem:number, target:string, routing:number) {
    this.itemSelected = dataItem;
    this.appService.setSelectedServiceOption(this.itemSelected);
    let url = this.urlItems[this.itemSelected];
    setTimeout(() => {
      if (routing) {
        this.router.navigate([url]);
      } else {
        window.open(url, target);
      } 
    }, 100);       
  }
}
