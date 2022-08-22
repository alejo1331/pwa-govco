import { Component, OnInit } from '@angular/core';
import { BottomMenuService } from 'src/app/transversales/services/bottom-menu/bottom-menu.service';
import { HeaderService } from 'src/app/transversales/services/header-service/header.service';
import { SidenavService } from 'src/app/transversales/services/sidenav-service/sidenav-service.service';

@Component({
  selector: 'app-codigos-ciiu-y-tramites',
  templateUrl: './codigos-ciiu-y-tramites.component.html',
  styleUrls: ['./codigos-ciiu-y-tramites.component.scss']
})
export class CodigosCiiuYTramitesComponent implements OnInit {

  Codigo: string = 'sobrenosotros';
  description: string = 'Esta consulta le permite identificar los trámites asociados a la actividad económica CIIU de su empresa o emprendimiento.';
  title: string = 'Codigo CIIU';
  title2: string = 'Consulta de trámites por actividad económica - CIIU';

  constructor(
    protected servicioHeader: HeaderService,
    public bottomService: BottomMenuService,
    protected servicioSideNav: SidenavService
    ) { }

  ngOnInit(): void {
    this.servicioHeader.estadoHeader(true, true);
    this.bottomService.seleccionandoItem(3);
    this.bottomService.ajustandoPantalla(false);
    this.servicioSideNav.seleccionandoItem(false,'null');
  }

}
