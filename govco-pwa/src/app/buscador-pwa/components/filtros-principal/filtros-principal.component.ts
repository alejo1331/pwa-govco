import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';
import { DATA_FILTRO_SECCIONES } from '../../models/dataFiltroSeccionesModel';
import { FiltrosService } from '../../services/filtros.service';
import { ModalFiltroSegundoNivelComponent } from '../../../biblioteca-pwa/components/modal-filtro-segundo-nivel/modal-filtro-segundo-nivel.component';
import { InformacionModalInterface } from '../../../biblioteca-pwa/models/filtro-nivel-dos/filtro-nivel-dos-interface';
import { Subscription } from 'rxjs';
import { Platform } from '@angular/cdk/platform';
import { ResultadoFiltro } from '../../models/resultadoFiltroModel';
import { FilterMordal, FiltroBusqueda } from '../../models/filtroBusquedaModel';
import { MatDialog } from '@angular/material/dialog';
import { ModalInformativoComponent } from 'src/app/biblioteca-pwa/components/modal-informativo/modal-informativo.component';
import { BuscadorService } from '../../services/buscador.service';
import { GeolocalizacionService } from 'src/app/transversales/services/geolocalizacion/geolocalizacion.service';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';

@Component({
  selector: 'app-filtros-principal',
  templateUrl: './filtros-principal.component.html',
  styleUrls: ['./filtros-principal.component.scss']
})
export class FiltrosPrincipalComponent implements OnInit {
  @ViewChild('modalFiltroNivel1') filtroPrimerNivel: ElementRef;
  @ViewChild(ModalFiltroSegundoNivelComponent) ModalFiltroSegundoNivelComponent: ModalFiltroSegundoNivelComponent;
  informacionModalFiltro: InformacionModalInterface;

  public seccionFiltros = DATA_FILTRO_SECCIONES;
  public resultadosSubscription: Subscription;
  filterSubscription: Subscription;
  public resultadosBusqueda: ResultadoFiltro;
  private filtroSeleccionado = '';
  public seccion = '';
  public busqueda = '';
  public filtrosSeleccionados: FilterMordal = {};
  ubicacionAux: Array<any> = [];
  itemSeleccionados: number = 0;
  filters: any;

  constructor(
    protected filtrosService: FiltrosService,
    private buscadorService: BuscadorService,
    protected ServicioGeolocalizacion: GeolocalizacionService,
    public platform: Platform,
    public dialog: MatDialog,
    private modalService: NgbModal,
  ) { }

  ngOnInit(): void {
    this.seccion = this.filtrosService.getFilters?.seccion || '';
    this.busqueda = this.filtrosService.getFilters?.search || '';

    this.filterSubscription = this.filtrosService.getFilters$.subscribe(
      async (data: FiltroBusqueda | undefined) => {
          this.filters = {
            departamento: data?.filters?.departamento,
            municipio: data?.filters?.municipio
          };
      });

    this.resultadosSubscription = this.filtrosService.ResultadoBusqueda$.subscribe((resultados) => {
      const filter = this.filtrosService.getFilters;

      if (filter?.seccion != this.seccion || filter?.search != this.busqueda) {
        this.seccion = filter?.seccion || '';
        this.busqueda = filter?.search || '';
        this.filtrosSeleccionados = {};
      } else {
        this.actualizarFiltrosSeleccionados(filter);
      }

      if (resultados) {
        this.resultadosBusqueda = resultados;
        this.actualizaFiltrosActivos();
      }
    });

    this.clickBackdrop();
    this.clickEscape();
  }

  actualizarFiltrosSeleccionados(filter:FiltroBusqueda) {
    this.filtrosSeleccionados = {};

    const filtrosS = filter? filter.filters : {};
    if (!filtrosS) {
      return false;
    }
    this.seccionFiltros[this.seccion].forEach((element: { active: boolean; id: string, padre: string }) => {
      const filtroId = element.id == 'subCategorias' ? 'subcategorias' : element.id;
      if (filtrosS[filtroId] && filtrosS[filtroId] != undefined) {
        this.filtrosSeleccionados[filtroId] = filtrosS[filtroId];
      }
    });
  }

  clickBackdrop() {
    let th = this;
    $('.backdrop-filtros').on("click", function (event) {
      const container = $(".container-filtros");
      if ($(event.target).closest(container).length == 0 && !event.target.classList.contains('delete-selection')) {
        th.filtroPrimerNivel.nativeElement.classList.toggle('show');
        th.removerFocus();
      }
    });
  }

  clickEscape() {
    document.addEventListener('keydown', (event) => {
      const modalFiltroSegundoNivel = document.querySelector('.modal-filtro-pwa')?.classList.contains('show');
      if (event.key == 'Escape' && !modalFiltroSegundoNivel) {
        this.filtroPrimerNivel.nativeElement.classList.remove('show');
        this.removerFocus();
      }
    }, false);
  }

  actualizaFiltrosActivos() {
    const filtrosResultadoBusqueda = this.resultadosBusqueda.filtros[0];
    this.seccionFiltros[this.seccion].forEach((element: { active: boolean; id: string, padre: string }) => {
      let condicionPadre = true;
      if (element.padre) {
        condicionPadre = this.filtrosSeleccionados[element.padre] != undefined;
      }
      element.active = filtrosResultadoBusqueda[element.id]?.length > 0 && condicionPadre;
    });
  }

  seleccionaFiltroNivelUno(idFiltro: string, tituloFiltro: string, event: any) {
    if (event.target.classList.contains('infoBoton') || event.target.classList.contains('info') || event.target.classList.contains('delete-selection')) {
      return false;
    }

    this.filtroSeleccionado = idFiltro == 'subCategorias' ? 'subcategorias' : idFiltro;
    let subFiltroSeleccionado = '';

    if (this.filtrosSeleccionados != null && this.filtrosSeleccionados[idFiltro]) {
      subFiltroSeleccionado = this.filtroSeleccionado == 'categorias' || this.filtroSeleccionado == 'subcategorias' ? this.filtrosSeleccionados[idFiltro].nombre : this.filtrosSeleccionados[idFiltro];
    }

    //inicia el servicio para el filtro de segundo nivel
    this.informacionModalFiltro = {
      titulo: tituloFiltro,
      contendioModal: this.resultadosBusqueda.filtros[0][idFiltro],
      itemSeleccionado: subFiltroSeleccionado
    }

    //al final de subscribe --> servicio completo se abre el modal
    //el setTimeout simula el tiempo de consulta del servicio y una vez finalizada la consulta
    // se abre el modal
    setTimeout(() => {
      this.removerFocus();
      this.ModalFiltroSegundoNivelComponent.abrirModal();
    }, 100);
  }

  abrirModal() {
    this.filtroPrimerNivel.nativeElement.classList.toggle('show');
    this.focus();
    if (this.platform.IOS || this.platform.SAFARI) {
      const body = (document.getElementsByTagName('body') as HTMLCollectionOf<HTMLElement>)[0];
      body.classList.toggle('contenido-body');
    }
  }

  itemFiltroNivelDos(item: string) {
    if (item && this.filtrosSeleccionados[this.filtroSeleccionado] == undefined) {
      this.itemSeleccionados++;
    }

    this.filtrosSeleccionados = this.filtrosService.getFilters?.filters != null ? this.filtrosService.getFilters.filters : {};
    if (this.filtroSeleccionado == 'categorias' || this.filtroSeleccionado == 'subcategorias') {
      this.filtrosSeleccionados[this.filtroSeleccionado] = { 'nombre': item }
    } else {
      this.filtrosSeleccionados[this.filtroSeleccionado] = item;
    }    
    this.focus();

    if (this.filtroSeleccionado) {
      const itemActivo = <HTMLElement>document.querySelector('[itemfiltroniveluno="' + this.filtroSeleccionado + '"]');
      itemActivo.focus();
    }
    this.actualizarBusqueda();
  }

  eliminarFiltro(item: string) {
    delete this.filtrosSeleccionados[item];
    this.itemSeleccionados--;

    if (item == 'categorias' && this.filtrosSeleccionados['subcategorias']) {
      delete this.filtrosSeleccionados['subcategorias'];
      this.itemSeleccionados--;
    } else if (item == 'anioPublicacionFiltro' && this.filtrosSeleccionados['mesPublicacionFiltro']) {
      delete this.filtrosSeleccionados['mesPublicacionFiltro'];
      this.itemSeleccionados--;
    }

    this.actualizarBusqueda();
  }

  limpiarFiltros() {
    this.filtrosSeleccionados = {};
    this.itemSeleccionados = 0;
    this.actualizarBusqueda();
  }

  actualizarBusqueda() {
    const parametrosBuscador = this.buscadorService.getBuscadorParams;
    this.seccion = parametrosBuscador.txtConsumoApi;

    this.filtrosService.setFilters = {
      filters: {
        categorias: this.filtrosSeleccionados.categorias,
        subcategorias: this.filtrosSeleccionados.subcategorias,
        entidadNombre: this.filtrosSeleccionados.entidadNombre,
        sector: this.filtrosSeleccionados.sector,
        fechaPublicacionFiltro: this.filtrosSeleccionados.fechaPublicacionFiltro,
        fechaCierreFiltro: this.filtrosSeleccionados.fechaCierreFiltro,
        nombreEstandarizado: this.filtrosSeleccionados.nombreEstandarizado,
        tipoEntidad: this.filtrosSeleccionados.tipoEntidad,
        anioPublicacionFiltro: this.filtrosSeleccionados.anioPublicacionFiltro,
        mesPublicacionFiltro: this.filtrosSeleccionados.mesPublicacionFiltro,
        estado: this.filtrosSeleccionados.estado,
        departamento: this.filters['departamento'],
        municipio: this.filters['municipio']
      },
      pageNumber: 1,
      pageSize: 5,
      search: parametrosBuscador.txtInputBuscador,
      sort: '',
      seccion: parametrosBuscador.txtConsumoApi,
      spinner: true,
    };
  }

  focus() {
    const currDialog = document.querySelector(".container-filtros");

    if (currDialog) {
      const focusableElements = currDialog.querySelectorAll(
        'a[href], button, input, textarea, select, details, [tabindex]:not([tabindex="-1"])'
      );

      let first = <HTMLElement>focusableElements[0];
      let last = <HTMLElement>focusableElements[focusableElements.length - 1];

      $(document.body).on("focusin", (event) => {
        if (!currDialog.contains(<HTMLElement>event.target)) {
          event.preventDefault();
          event.stopPropagation();

          const previous = event.relatedTarget;

          if (previous == last) {
            first.focus();
          } else if (previous == first) {
            last.focus();
          }
        }
      });
    }
  }

  removerFocus() {
    $(document.body).off("focusin");
  }

  activarSpinner(activa: boolean) {
    const element = document.querySelector('.spinner-pwa');
    const backdrop = document.querySelector('.backdrop-spinner-filtros');
    if (activa) {
      element?.classList.add('show');
      backdrop?.classList.add('show');
    } else {
      element?.classList.remove('show');
      backdrop?.classList.remove('show');
    }
  }

  ngOnDestroy() {
    this.resultadosSubscription.unsubscribe();
    this.removerFocus();
    if (this.filterSubscription) {
      this.filterSubscription.unsubscribe();
    }
  }

  abrirModalInformativo() {
    const modalRef = this.modalService.open(ModalInformativoComponent, {
      size: 'lg',
      backdrop: 'static',
      keyboard: false,
      centered: true,
      windowClass: 'background-modal',
    });
    modalRef.componentInstance.data = "Trámites que se repiten en diferentes entidades que realizan el mismo proceso y son agrupados bajo un nombre común.";
  }
}
