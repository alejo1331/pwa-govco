import { Component, OnInit } from '@angular/core';
import { BottomMenuService } from 'src/app/transversales/services/bottom-menu/bottom-menu.service';
import { HeaderService } from 'src/app/transversales/services/header-service/header.service';
import { SidenavService } from 'src/app/transversales/services/sidenav-service/sidenav-service.service';


@Component({
  selector: 'app-perfil-home',
  templateUrl: './perfil-home.component.html',
  styleUrls: ['./perfil-home.component.css']
})
export class PerfilHomeComponent implements OnInit {

  constructor(
    protected servicioHeader: HeaderService,
    public bottomService: BottomMenuService,
    protected servicioSideNav: SidenavService
  ) { }

  ngOnInit() {
    this.servicioHeader.estadoHeader(false, true);
    this.bottomService.seleccionandoItem(2)
    this.servicioSideNav.seleccionandoItem(false, 'null');
  }

}
