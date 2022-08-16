import { Component, Input, OnInit } from '@angular/core';
import { BottomMenuService } from 'src/app/transversales/services/bottom-menu/bottom-menu.service';
import { HeaderService } from 'src/app/transversales/services/header-service/header.service';
import { SidenavService } from 'src/app/transversales/services/sidenav-service/sidenav-service.service';
import { EjerciciosModel } from '../../models/ejercicios.model';
import { FiltrosParticipacionModel } from '../../models/FiltrosParticipacionModels';
import { ParticipaModel } from '../../models/participa.model';
import { EjerciciosService } from '../../services/ejercicios.service';
import { ParticipaService } from '../../services/participa.service';
import { ValidarUrlService } from '../../services/validar-url.service';
import { esResponsive, isMobile } from '../../utils/utils';

@Component({
  selector: 'app-participa',
  templateUrl: './participa.component.html',
  styleUrls: ['./participa.component.scss'],
})

export class ParticipaComponent implements OnInit {
  showNext: boolean = false;
  page = 1;
  pageSize = 6;
  totalPage = 0;
  title: string;
  descripcion: string;
  @Input() filtro: FiltrosParticipacionModel;
  currentPage: number = 0;
  currentPageAccesibilidad: number = 0;
  estadoPaginadorAccesible: boolean = false;
  estadoAlertaAccesible: boolean = false;
  totalNoticias: number = 0;
  totalPages: number = 0;
  pages: number[] = new Array(4);
  llamadoADatos: boolean = false;
  esResponsive = esResponsive;
  ejercicios: EjerciciosModel[];
  objetoEjercicios: any;
  videoHome: ParticipaModel;
  mostrarTemas: boolean = false;
  listaFiltros: any = [{ codigo: "Fecha inicio - Más reciente", nombre: "Fecha inicio - más reciente" }, { codigo: "Fecha inicio - Más antigua", nombre: "Fecha inicio - más antigua" }, { codigo: "Alfabéticamente Z - A", nombre: "Alfabéticamente z - a" }, { codigo: "Alfabéticamente A - Z", nombre: "Alfabéticamente a - z" }];
  seleccionado: any = this.listaFiltros[0];

  constructor(
    private ejerciciosService: EjerciciosService,
    private participaService: ParticipaService,
    public validarUrlService: ValidarUrlService,
    protected servicioSideNav: SidenavService,
    protected servicioHeader: HeaderService,
    public bottomService: BottomMenuService
  ) { }

  ngOnInit() {
    this.servicioHeader.estadoHeader(true, true);
    this.bottomService.seleccionandoItem(0);
    this.servicioSideNav.seleccionandoItem(true, 'participa');
    this.bottomService.ajustandoPantalla(false);

    this.iniciarFiltro();
    this.iniciarCargaDatos();
    window["objeto"] = this;

    this.participaService.getTitleAndDescription()
      .subscribe((resp) => {
        this.title = resp.data.titulo;
        this.descripcion = resp.data.descripcion;
      })

  }

  ngAfterViewInit() {
    window.addEventListener("load", () => {
      this.home();
    });
  }

  iniciarCargaDatos() {
    this.resize();
    this.currentPage = 0;
    this.currentPageAccesibilidad = 1;
    this.filtro.pageNumber = this.currentPage;
    this.obtenerEjerciciosPaginacion(this.currentPage);
  }

  resize() {
    this.llamadoADatos = esResponsive();
    window.addEventListener('resize', () => {
      if (esResponsive() && !this.llamadoADatos) {
        this.filtro.pageSize = 4;
        this.iniciarCargaDatos();
        this.llamadoADatos = true;
      } else if (!esResponsive() && this.llamadoADatos) {
        this.filtro.pageSize = 9;
        this.iniciarCargaDatos();
        this.llamadoADatos = false;
      }
    })
  }

  iniciarFiltro() {
    this.filtro = {
      pageNumber: 0,
      orden: this.seleccionado.codigo,
      pageSize: this.esResponsive() ? 4 : 9,
      soloActivo: "0",
      version: ""
    }
  }

  home() {
    this.participaService.getHome().subscribe((data) => {
      this.videoHome = data["data"];
    }, (error) => {
      console.error(error);
    });
  }

  obtenerEjerciciosPaginacion(page: number) {
    this.showNext = false;
    this.ejerciciosService.obtenerEjerciciosPaginacion(this.filtro)!.subscribe(
      (data) => {
        if (data) {
          this.objetoEjercicios = data.data;
          this.ejercicios = [];
          this.ejercicios = this.objetoEjercicios.data;
          this.currentPage = page;
          this.currentPageAccesibilidad = this.currentPage + 1;
          this.totalPages = this.objetoEjercicios.ultimaPagina;
          if (this.currentPage < this.totalPages - 1) {
            this.showNext = true;
          }

        }
      }
    );
  }

  changePage(page: number) {
    this.currentPage = page
    this.filtro.pageNumber = page;
    this.obtenerEjerciciosPaginacion(page);
    this.setFocusGrupoNoticias();
  }

  activarEventosAccesibilidad(evt: any) {
    if (evt.keyCode == 9) {
      window["objeto"] = this;
      window.addEventListener('keyup', this.setEventos);
      window.addEventListener('keypress', this.setEventos);
      this.estadoPaginadorAccesible = true;
    } else if (evt.keyCode == 27) {
      document.getElementById("salir-seccion-participacion")!.focus();
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
      document.getElementById("salir-seccion-participacion")!.focus();
    }
  }

  setFocusGrupoNoticias() {
    setTimeout(() => {
      let box = document.getElementById('govco-header');
      document.getElementById('contenedor-temas-participacion-focus')!.style["scrollMarginTop"] = "0px";
      if (isMobile() || !esResponsive()) {
        document.getElementById('contenedor-temas-participacion-focus')!.style["scrollMarginTop"] = (box!.offsetHeight) + "px";
      }
      document.getElementById('contenedor-temas-participacion-focus')!.scrollIntoView();
    }, 1000);
  }

  focoSeccionParticipa() {
    let box = document.getElementById('govco-header');
    document.getElementById('seccionParticipa')!.style["scrollMarginTop"] = "0px";
    if (isMobile() || !esResponsive()) {
      document.getElementById('seccionParticipa')!.style["scrollMarginTop"] = (box!.offsetHeight) + "px";
    }

    document.getElementById('seccionParticipa')!.scrollIntoView();
  }

  cargarPaginaAccesible(evet: any) {
    if (+evet.target.value > this.totalPages) {
      this.estadoAlertaAccesible = true;
      setTimeout(() => {
        document.getElementById("mensaje-numero-paginas")!.focus();
      }, 100);

    } else {
      this.changePage(+evet.target.value - 1);
      this.setFocusGrupoNoticias();
    }
  }

  filtrarActivos() {
    this.mostrarTemas = !this.mostrarTemas;
    this.filtro.soloActivo = this.mostrarTemas ? '1' : '0';
    this.iniciarCargaDatos();
  }

  filtrarOrden(seleccionado: any) {
    this.filtro.orden = seleccionado.detail.codigo;
    this.iniciarCargaDatos();
  }
}
