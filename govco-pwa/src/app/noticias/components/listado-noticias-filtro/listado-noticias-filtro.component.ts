import { Component, Input, OnChanges, OnInit, SimpleChanges } from '@angular/core';
import { NoticiaPublicadaModel } from 'src/app/noticias/models/noticiaPublicadaModel';
import { FiltrosNoticiasModel } from 'src/app/noticias/models/FiltrosNoticiasModel';
import { esResponsive, isMobile } from 'src/app/noticias/utils/utils';
import { NoticiasServiceService } from 'src/app/noticias/services/noticias-service/noticias-service.service';
import { BuscadorParams, BuscadorService } from 'src/app/buscador-pwa/services/buscador.service';
import { ItemsBuscador } from 'src/variables-globales/items-buscador';

@Component({
  selector: 'govco-listado-noticias-filtros',
  templateUrl: './listado-noticias-filtro.component.html',
  styleUrls: ['./listado-noticias-filtro.component.scss']
})
export class ListadoNoticiasFiltroComponent implements OnInit, OnChanges {

  objetoNoticias: any;
  noticias: NoticiaPublicadaModel[] = [];
  showNext: boolean = false;
  currentPage: number = 0;
  currentPageAccesibilidad: number = 0;
  estadoPaginadorAccesible: boolean = false;
  estadoAlertaAccesible: boolean = false;
  totalNoticias: number = 0;
  totalPages: number = 0;
  indexIni: number = 0;
  pages: number[] = new Array(4);
  puntosPaginacion: number[] = new Array(2);
  @Input() filtro: FiltrosNoticiasModel;
  llamadoADatos: boolean = false;
  esResponsive = esResponsive;
  mostrarMensajeSinDatos: boolean = false;
  eventOnChanges: boolean = false;

  private paginationInfo = {
    page: 0,
    pageSize: 10
  }

  constructor(
    private noticiasService: NoticiasServiceService,
    private buscadorService: BuscadorService,
  ) { }

  ngOnInit() {
    this.iniciarCargaDatos();
    window["objeto"] = this;
    localStorage.setItem("consumidor", "noticias");
  }

  ngOnChanges(changes: SimpleChanges): void {
    if (this.eventOnChanges) {
      if (changes.filtro) {
        this.noticiasService.setCurrentPage(0);
        this.iniciarCargaDatos();
      }
    } else {
      this.eventOnChanges = true;
    }
  }

  iniciarCargaDatos() {
    this.resize();
    this.setVersion();
    this.currentPage = this.noticiasService.getCurrentPage();
    this.currentPageAccesibilidad = this.noticiasService.getCurrentPage() + 1;
    this.filtro.pageNumber = this.currentPage;
    this.inicializarVariablesPaginado();
    this.obtenerNoticiasPaginacion(this.currentPage);
  }

  resize() {
    this.llamadoADatos = esResponsive();
    window.addEventListener('resize', () => {
      if (esResponsive() != this.llamadoADatos) {
        this.noticiasService.setCurrentPage(0);
        this.iniciarCargaDatos();
        this.llamadoADatos = esResponsive();
      }
    })
  }

  setVersion() {
    if (esResponsive()) {
      this.filtro.version = "responsive";
    } else {
      this.filtro.version = "desktop";
    }
  }

  inicializarVariablesPaginado() {
    this.currentPage = this.noticiasService.getCurrentPage();
    if (this.currentPage == 0) {
      this.indexIni = 1;
      this.paginationInfo.pageSize = esResponsive() ? 4 : 7;
    } else if (this.currentPage > 0) {
      this.indexIni = 0;
      this.paginationInfo.pageSize = esResponsive() ? 4 : 9;
    }
  }

  obtenerNoticiasPaginacion(page: any) {
    this.showNext = false;
    this.noticiasService.obtenerNoticiasPaginacion(this.filtro).subscribe(
      (data) => {
        if (data) {
          this.objetoNoticias = data.data;
          this.noticias = data.data.noticias;
          this.currentPage = page;
          this.currentPageAccesibilidad = this.noticiasService.getCurrentPage() + 1;
          this.totalPages = this.objetoNoticias.ultimaPagina;
          if (this.noticias.length == 0) {
            this.mostrarMensajeSinDatos = true;
          } else {
            this.mostrarMensajeSinDatos = false;
          }
          if (this.currentPage < this.totalPages - 1) {
            this.showNext = true;
          }
        } else {
          this.mostrarMensajeSinDatos = true;
        }
      }
    );
  }

  changePage(page: number) {
    this.noticiasService.setCurrentPage(page);
    this.inicializarVariablesPaginado();
    this.filtro.pageNumber = page;
    this.obtenerNoticiasPaginacion(page);
    this.setFocusGrupoNoticias();
  }

  activarEventosAccesibilidad(evt: any) {
    if (evt.keyCode == 9) {
      window["objeto"] = this;
      window.addEventListener('keyup', this.setEventos);
      window.addEventListener('keypress', this.setEventos);
      this.estadoPaginadorAccesible = true;
    } else if (evt.keyCode == 27) {
      document.getElementById("salir-seccion-noticias")?.focus();
    }
  }

  desActivarEventosAccesibilidad(evt: any) {
    if (evt.keyCode == 9) {
      window.removeEventListener('keyup', this.setEventos);
      window.removeEventListener('keypress', this.setEventos);
      this.estadoPaginadorAccesible = false;
    }
  }

  setEventos(evt: any) {
    if (evt.key === "Escape") {
      window.removeEventListener('keyup', window["objeto"].setEventos);
      document.getElementById("salir-seccion-noticias")?.focus();
    }
    if (evt.code === "Space") {
      document.getElementById("listado-noticias")?.focus();
    }
  }

  setFocusGrupoNoticias() {
    setTimeout(() => {
      let box = document.getElementById('govco-header');
      document.getElementById('contenedor-noticias-focus')!.style["scrollMarginTop"] = "0px";
      if (isMobile() || !esResponsive()) {
        document.getElementById('contenedor-noticias-focus')!.style["scrollMarginTop"] = (box!.offsetHeight) + "px";
      }
      document.getElementById('contenedor-noticias-focus')!.scrollIntoView();
    }, 1000);
  }

  cargarPaginaAccesible(evet: any) {
    if (+evet.target.value > this.totalPages) {
      this.estadoAlertaAccesible = true;
      setTimeout(() => {
        document.getElementById("mensaje-numero-paginas")?.focus();
      }, 100);

    } else {
      this.changePage(+evet.target.value - 1);
      this.setFocusGrupoNoticias();
    }
  }

  abrirBuscadorPWA() {
    const i: number = 2;
    this.buscadorService.setAbrirBuscador(true);
    const buscadorParams: BuscadorParams = {
      index: ItemsBuscador[i].id,
      txtInputBuscador: '',
      txtConsumoApi: ItemsBuscador[i].txtConsumoApi,
      aplicaGeoreferenciacion: ItemsBuscador[i].aplicaGeoreferenciacion
    }
    this.buscadorService.setBuscadorParams(buscadorParams);
  }
}

