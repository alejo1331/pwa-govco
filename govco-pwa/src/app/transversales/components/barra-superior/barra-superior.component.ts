import { AfterViewInit, Component, ElementRef, EventEmitter, OnInit, Output, ViewChild } from '@angular/core';
import { Router } from '@angular/router';
import { BuscadorService, BuscadorParams } from 'src/app/buscador-pwa/services/buscador.service';
import { ItemsBuscador } from 'src/variables-globales/items-buscador';
import { HeaderService } from '../../services/header-service/header.service';
import { SidenavService } from '../../services/sidenav-service/sidenav-service.service';
import { BuscadorPrefiltradoComponent } from '../buscador-prefiltrado/buscador-prefiltrado.component';


@Component({
  selector: 'app-barra-superior',
  templateUrl: './barra-superior.component.html',
  styleUrls: ['./barra-superior.component.css']
})
export class BarraSuperiorComponent implements OnInit, AfterViewInit {

  @Output() outEstadoMenu = new EventEmitter<boolean>();
  @ViewChild(BuscadorPrefiltradoComponent) buscadorPrefiltrado: BuscadorPrefiltradoComponent;
  @ViewChild('menuHamburguesa') icono_menu: ElementRef;
  estadoFocusFiltro: boolean = true;

  estadoMenu: boolean = false;
  barraSuperiorInterna: boolean = false;
  ocultar: boolean;

  constructor(
    protected servicioSideNav: SidenavService,
    protected servicioHeader: HeaderService,
    private buscadorService: BuscadorService,
    private router: Router
  ) { }

  ngOnInit(): void {
    this.ocultar = false;
    this.servicioHeader.ocultandoHeader.subscribe(([estilo, estado]) => {
      this.ocultar = estado;
      this.barraSuperiorInterna = estilo;
    })
  }

  ngAfterViewInit(): void {
    const modalVisto = sessionStorage.getItem('modalVisto');
    if(modalVisto) this.icono_menu.nativeElement.focus();
  }

  onClickMenu() {
    this.estadoMenu = this.estadoMenu ? false : true;
    this.outEstadoMenu.emit(this.estadoMenu);
  }

  desactivarItem() {
    this.servicioSideNav.seleccionandoItem(false, 'null');
  }

  clickHome() {
    this.router.navigate(['/']);
    document.querySelector('#topScroll')!.scrollTop = 0;
  }

  limpiarBuscador() {
    this.configuracionOpcionPrefiltrado();
  }

  abrirBuscadorPWA() {
    this.buscadorService.setAbrirBuscador(true);
    this.configuracionOpcionPrefiltrado();
  }

  configuracionOpcionPrefiltrado() {
    const i: number = 0;
    const buscadorParams: BuscadorParams = {
      index: ItemsBuscador[i].id,
      txtInputBuscador: '',
      txtConsumoApi: ItemsBuscador[i].txtConsumoApi,
      aplicaGeoreferenciacion: ItemsBuscador[i].aplicaGeoreferenciacion
    }
    this.buscadorService.setBuscadorParams(buscadorParams);
  }

  onFocusLogo() {
    if (this.estadoFocusFiltro) {
      this.buscadorPrefiltrado.inputBuscador.nativeElement.focus()
    }
  }

}
