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

  anteriorUrl:any

  constructor(
    public router: Router,
    appService : AppService,
    public bottomService : BottomMenuService,
    protected servicioHeader: HeaderService,
    protected servicioSideNav: SidenavService
  ) {
    this.anteriorUrl = appService.currentUrl
   }

  ngOnInit() {
    this.servicioHeader.estadoHeader(false,false);
    this.bottomService.seleccionandoItem(3)
    this.servicioSideNav.seleccionandoItem(false,'null');
  }

  backUrl(){
    this.bottomService.quitarActive()
  }

}
