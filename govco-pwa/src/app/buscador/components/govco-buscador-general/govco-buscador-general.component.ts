import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { BottomMenuService } from 'src/app/transversales/services/bottom-menu/bottom-menu.service';
import { HeaderService } from 'src/app/transversales/services/header-service/header.service';
import { SidenavService } from 'src/app/transversales/services/sidenav-service/sidenav-service.service';
import { CategoriasBuscadorService } from './categorias-buscador.service';


@Component({
  selector: 'app-buscador-general',
  templateUrl: './govco-buscador-general.component.html',
  styleUrls: ['./govco-buscador-general.component.scss']
})
export class BuscadorGeneralComponent implements OnInit {
  busqueda: any;
  navegador: string;
  public paramtrofiltros: string;
  statusMenu: boolean = false;


  constructor(
    private actRoute: ActivatedRoute,
    private categoriasBuscadorService: CategoriasBuscadorService,
    protected servicioSideNav: SidenavService,
    protected servicioHeader: HeaderService,
    public bottomService: BottomMenuService
  ) { }

  ngOnInit() {
    this.servicioHeader.estadoHeader(true, true);
    this.bottomService.seleccionandoItem(0);    

    let itemSeleccionado = localStorage.getItem("consumidor") ? localStorage.getItem("consumidor") : '';
    if (itemSeleccionado == 'entidades') { itemSeleccionado = 'entidadesEstado'; }
    this.servicioSideNav.seleccionandoItem(true, itemSeleccionado!);

    this.navegador = this.getBrowserName();
    if (this.navegador != 'ie') {
      this.actRoute.paramMap.subscribe(params => {
        this.busqueda = params.get('busqueda');
      });
    } else {
      this.busqueda = this.actRoute.snapshot.paramMap.get('busqueda');
    }

    if (this.busqueda == null) { this.busqueda = ''; }
    this.paramtrofiltros = JSON.stringify(this.categoriasBuscadorService.getParametro());
  }

  private getBrowserName() {
    const agent = window.navigator.userAgent.toLowerCase()
    switch (true) {
      case agent.indexOf('edge') > -1:
        return 'edge';
      case agent.indexOf('opr') > -1 && !!(<any>window).opr:
        return 'opera';
      case agent.indexOf('chrome') > -1 && !!(<any>window).chrome:
        return 'chrome';
      case agent.indexOf('trident') > -1:
        return 'ie';
      case agent.indexOf('firefox') > -1:
        return 'firefox';
      case agent.indexOf('safari') > -1:
        return 'safari';
      default:
        return 'other';
    }
  }

}
