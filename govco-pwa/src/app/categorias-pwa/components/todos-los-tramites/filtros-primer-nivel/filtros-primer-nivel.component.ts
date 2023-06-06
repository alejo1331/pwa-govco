import { Component, OnInit, ElementRef, ViewChild } from '@angular/core';
import { Platform } from '@angular/cdk/platform';
import { ModalFiltroSegundoNivelComponent } from 'src/app/biblioteca-pwa/components/modal-filtro-segundo-nivel/modal-filtro-segundo-nivel.component';
import { InformacionModalInterface } from 'src/app/biblioteca-pwa/models/filtro-nivel-dos/filtro-nivel-dos-interface';
import { FiltrosTramitesService } from 'src/app/categorias-pwa/services/filtros-tramites/filtros-tramites.service';
import { Subscription } from 'rxjs';
import { FiltroBusquedaTramites, FilterModal } from 'src/app/categorias-pwa/Models/filtroBusquedaTramitesModel';
import { ResultadoFiltroTramites } from 'src/app/categorias-pwa/Models/resultadoFiltroTramitesModel';
import { DATA_FILTRO_TRAMITE } from 'src/app/categorias-pwa/Models/dataFiltroTamiteModel';
import { ModalInformativoComponent } from 'src/app/biblioteca-pwa/components/modal-informativo/modal-informativo.component';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';

@Component({
  selector: 'app-filtros-primer-nivel',
  templateUrl: './filtros-primer-nivel.component.html',
  styleUrls: ['./filtros-primer-nivel.component.scss']
})
export class FiltrosPrimerNivelComponent implements OnInit {
  @ViewChild('modalFiltroNivel1') filtroPrimerNivel: ElementRef;  
  @ViewChild(ModalFiltroSegundoNivelComponent) ModalFiltroSegundoNivelComponent: ModalFiltroSegundoNivelComponent;
  informacionModalFiltro: InformacionModalInterface;
  filterSubscription: Subscription;
  filters: any;
  public resultadosSubscription: Subscription;
  public resultadosBusqueda: ResultadoFiltroTramites;
  public seccionFiltros = DATA_FILTRO_TRAMITE;
  itemSeleccionados: number = 0;
  public filtrosSeleccionados: FilterModal = {};
  private filtroSeleccionado = '';

  constructor(
    public platform: Platform,
    protected filtrosService: FiltrosTramitesService,
    private modalService: NgbModal,
  ) { }

  ngOnInit(): void {
    this.filterSubscription = this.filtrosService.getFilters$.subscribe(
      async (data: FiltroBusquedaTramites | undefined) => {
          this.filters = {
            departamento: data?.filters?.departamento,
            municipio: data?.filters?.municipio,
            categorias: data?.filters?.categorias,
            tipocategorias: data?.filters?.tipocategorias
          };
      });

    this.resultadosSubscription = this.filtrosService.ResultadoBusqueda$.subscribe((resultados) => {
      if (resultados) {
        this.resultadosBusqueda = resultados;
        this.actualizaFiltrosActivos();
      }
    });

    this.clickBackdrop();
    this.clickEscape();
  }

  actualizarFiltrosSeleccionados(filter:FiltroBusquedaTramites) {
    this.filtrosSeleccionados = {};

    const filtrosS = filter? filter.filters : {};
    if (!filtrosS) {
      return false;
    }
    this.seccionFiltros.forEach((element) => {
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
        th.removeClassActiveFilter();
      }
    });
  }

  clickEscape() {
    document.addEventListener('keydown', (event) => {
      const modalFiltroSegundoNivel = document.querySelector('.modal-filtro-pwa')?.classList.contains('show');
      if (event.key == 'Escape' && !modalFiltroSegundoNivel) {
        this.filtroPrimerNivel.nativeElement.classList.remove('show');
        this.removerFocus();
        this.removeClassActiveFilter();
      }
    }, false);
  }

  actualizaFiltrosActivos() {
    const filtrosResultadoBusqueda = this.resultadosBusqueda.filtros[0];
    this.seccionFiltros.forEach((element) => {
      element.active = filtrosResultadoBusqueda[element.id]?.length > 0 ? 1 : 0;
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
    this.filtrosService.setFilters = {
      filters: {
        categorias: this.filters['categorias'],
        tipocategorias: this.filters['tipocategorias'],        
        subcategorias: this.filtrosSeleccionados.subcategorias,
        entidadNombre: this.filtrosSeleccionados.entidadNombre,
        sector: this.filtrosSeleccionados.sector,
        nombreEstandarizado: this.filtrosSeleccionados.nombreEstandarizado,
        departamento: this.filters['departamento'],
        municipio: this.filters['municipio']
      },
      pageNumber: 1,
      pageSize: 5,
      search: ' ',
      sort: '',
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

  removeClassActiveFilter() {
    const elementModal = document.querySelector('.modal-desplegable-pwa');
    elementModal?.classList.remove('backdrop-active-filter-tramites');
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
