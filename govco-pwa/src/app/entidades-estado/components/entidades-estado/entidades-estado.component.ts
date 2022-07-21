import { Component, OnInit } from '@angular/core';
import { HeaderService } from 'src/app/transversales/services/header-service/header.service';
import { SidenavService } from 'src/app/transversales/services/sidenav-service/sidenav-service.service';

@Component({
  selector: 'app-entidades-estado',
  templateUrl: './entidades-estado.component.html',
  styleUrls: ['./entidades-estado.component.scss']
})
export class EntidadesEstadoComponent implements OnInit {
  public parametroBuscador: string
  constructor(
    protected servicioHeader: HeaderService,
    protected servicioSideNav: SidenavService
  ) {
    this.parametroBuscador = '';
  }

  ngOnInit(): void {
    this.servicioHeader.estadoHeader(true, true);
    this.servicioSideNav.seleccionandoItem(true,'entidadesEstado');
  }

}
