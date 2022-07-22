import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { BottomMenuService } from '../../services/bottom-menu/bottom-menu.service';
import { HeaderService } from '../../services/header-service/header.service';
import { SidenavService } from '../../services/sidenav-service/sidenav-service.service';

@Component({
  selector: 'app-barra-superior',
  templateUrl: './barra-superior.component.html',
  styleUrls: ['./barra-superior.component.css']
})
export class BarraSuperiorComponent implements OnInit {

  @Output() outEstadoMenu = new EventEmitter<boolean>();

  estadoMenu: boolean = false;
  barraSuperiorInterna: boolean = false;
  ocultar: boolean = false;

  constructor(
    protected servicioSideNav: SidenavService,
    protected servicioHeader: HeaderService
  ) { }

  ngOnInit(): void {
    this.servicioHeader.ocultandoHeader.subscribe(([estilo, estado]) => {
      this.ocultar = estado;
      this.barraSuperiorInterna = estilo;
    })
  }

  onClickMenu() {
    this.estadoMenu = this.estadoMenu ? false : true;
    this.outEstadoMenu.emit(this.estadoMenu);
  }

  desactivarItem() {
    this.servicioSideNav.seleccionandoItem(false,'null');
  }

}