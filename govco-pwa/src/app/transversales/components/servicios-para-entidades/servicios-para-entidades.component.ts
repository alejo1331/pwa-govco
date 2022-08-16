import { Component, OnInit } from '@angular/core';
import { BottomMenuService } from '../../services/bottom-menu/bottom-menu.service';
import { HeaderService } from '../../services/header-service/header.service';
import { SidenavService } from '../../services/sidenav-service/sidenav-service.service';

@Component({
  selector: 'app-servicios-para-entidades',
  templateUrl: './servicios-para-entidades.component.html',
  styleUrls: ['./servicios-para-entidades.component.css']
})
export class ServiciosParaEntidadesComponent implements OnInit {

  constructor(
    protected servicioSideNav: SidenavService,
    protected servicioHeader: HeaderService,
    public bottomService: BottomMenuService
  ) { }

  ngOnInit(): void {
    this.servicioHeader.estadoHeader(true, true);
    this.bottomService.seleccionandoItem(0);
    this.servicioSideNav.seleccionandoItem(true,'serviciosEntidades');
    this.bottomService.ajustandoPantalla(false);
  }

}
