import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { HeaderService } from 'src/app/transversales/services/header-service/header.service';
import { SidenavService } from 'src/app/transversales/services/sidenav-service/sidenav-service.service';
import { AppService } from '../../../app.service';
import { BottomMenuService } from '../../../transversales/services/bottom-menu/bottom-menu.service';
import { BreadCrumbService } from '../../services/bread-crumb.service';

@Component({
  selector: 'app-tramites-home',
  templateUrl: './tramites-home.component.html',
  styleUrls: ['./tramites-home.component.scss']
})
export class TramitesHomeComponent implements OnInit {

  anteriorUrl: any

  constructor(
    public router: Router,
    appService: AppService,
    public bottomService: BottomMenuService,
    protected servicioHeader: HeaderService,
    protected servicioSideNav: SidenavService,
    private breadCrumbService: BreadCrumbService
  ) {
    this.anteriorUrl = appService.currentUrl
  }

  ngOnInit() {
    // servicioHeader.estadoHeader(a, b)       a -> true = header seccion internas
    //                                         a -> false = header general
    //                                         b -> Muestra/Oculta  Header
    //bottomService.seleccionandoItem(0)       0 -> Activa boton incio del menu inferior
    //                                         1, 2, 3 -> Tramites, Ingresa
    //servicioSideNav.seleccionandoItem(a, b)  a -> Activa o inactiva menu lateral
    //                                         b -> String con el valor del item a seleccionar
    //bottomService.ajustandoPantalla(true)    true -> Agrega clase de css para ajustar 
    //                                                 la pantalla cuando en la seccion  
    //                                                 consultada no tiene header
    this.servicioHeader.estadoHeader(false,true);
    this.bottomService.seleccionandoItem(1);
    this.bottomService.ajustandoPantalla(false);
    this.servicioSideNav.seleccionandoItem(false,'null');
    this.breadCrumbService.setTittle('')
    this.breadCrumbService.setTittleCiiu('');
  }

  backUrl() {
    this.bottomService.quitarActive()
  }

}
