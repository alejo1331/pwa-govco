import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { HeaderService } from 'src/app/transversales/services/header-service/header.service';
import { SidenavService } from 'src/app/transversales/services/sidenav-service/sidenav-service.service';
import { AppService } from '../../../app.service';
import { BottomMenuService } from '../../../transversales/services/bottom-menu/bottom-menu.service';

@Component({
  selector: 'app-tramites-home',
  templateUrl: './tramites-home.component.html',
  styleUrls: ['./tramites-home.component.css']
})
export class TramitesHomeComponent implements OnInit {

  anteriorUrl: any

  constructor(
    public router: Router,
    appService: AppService,
    public bottomService: BottomMenuService,
    protected servicioHeader: HeaderService,
    protected servicioSideNav: SidenavService
  ) {
    this.anteriorUrl = appService.currentUrl
  }

  ngOnInit() {
    this.servicioHeader.estadoHeader(false,false);
    this.bottomService.seleccionandoItem(1);
    this.servicioSideNav.seleccionandoItem(false,'null');
  }

  backUrl() {
    this.bottomService.quitarActive()
  }

}
