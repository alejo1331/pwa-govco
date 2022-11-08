import { Component, EventEmitter, OnInit, Output, ViewChild } from '@angular/core';
import { Router } from '@angular/router';
import { BuscadorService } from 'src/app/buscador-pwa/services/buscador.service';
import { HeaderService } from '../../services/header-service/header.service';
import { SidenavService } from '../../services/sidenav-service/sidenav-service.service';
import { BuscadorPrefiltradoComponent } from '../buscador-prefiltrado/buscador-prefiltrado.component';

@Component({
  selector: 'app-barra-superior',
  templateUrl: './barra-superior.component.html',
  styleUrls: ['./barra-superior.component.css']
})
export class BarraSuperiorComponent implements OnInit {

  @Output() outEstadoMenu = new EventEmitter<boolean>();
  @ViewChild(BuscadorPrefiltradoComponent) buscadorPrefiltrado: BuscadorPrefiltradoComponent;
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

  abrirBuscadorPWA() {
    this.buscadorService.setAbrirBuscador(true)
  }

  onFocusLogo() {
    this.estadoFocusFiltro == true ?
      this.buscadorPrefiltrado.inputBuscador.nativeElement.focus() : null;
  }

}
