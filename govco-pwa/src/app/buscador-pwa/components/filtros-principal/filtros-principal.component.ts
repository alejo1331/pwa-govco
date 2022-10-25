import { Component, OnInit, Input, ViewChild, ElementRef } from '@angular/core';
import { DATA_FILTRO_SECCIONES } from '../../models/dataFiltroSeccionesModel';
import { FiltrosService } from '../../services/filtros.service';
import { ModalFiltroSegundoNivelComponent } from '../../../biblioteca-pwa/components/modal-filtro-segundo-nivel/modal-filtro-segundo-nivel.component';
import { ContenidoModalFiltroInterface, InformacionModalInterface } from '../../../biblioteca-pwa/models/filtro-nivel-dos/filtro-nivel-dos-interface';
import { Subscription } from 'rxjs';
import { Platform } from '@angular/cdk/platform';
import { DataFiltros, ResultadoFiltro } from '../../models/resultadoFiltroModel';
import { filter } from '../../models/filtroBusquedaModel';

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
  public resultadosBusqueda:ResultadoFiltro;
  private filtroInicial = '';  
  public seccion = '';
  public busqueda = '';
  public filtersSelected:filter = {};

  constructor(
    protected filtrosService: FiltrosService,
    public platform: Platform
  ) { }

  ngOnInit(): void {
    console.log(this.filtersSelected);
    console.log(this.filtersSelected['categorias']);
    this.seccion = this.filtrosService.Filters?.seccion ? this.filtrosService.Filters?.seccion : '';
    this.busqueda = this.filtrosService.Filters?.search ? this.filtrosService.Filters?.search : '';

    this.resultadosSubscription = this.filtrosService.ResultadoBusqueda$.subscribe((resultados) => {
      if (resultados) {
        this.resultadosBusqueda = resultados;
        this.actualizaFiltrosActivos();
      }
    });
  }

  actualizaFiltrosActivos() {
    const filtrosResultadoBusqueda = this.resultadosBusqueda.filtros[0];
    this.seccionFiltros[this.seccion].forEach((element: { active: boolean; id: string }) => {
      element.active = filtrosResultadoBusqueda[element.id].length > 0 ? true : false;
    });
  }

  seleccionaFiltroNivelUno(idFiltro: string, tituloFiltro: string) {
    this.filtroInicial = idFiltro;
    //inicia el servicio para el filtro de segundo nivel
    this.informacionModalFiltro = {
      titulo: tituloFiltro,
      contendioModal: this.resultadosBusqueda.filtros[0][idFiltro],
      itemSeleccionado: this.filtersSelected != null ? this.filtersSelected[idFiltro] ? 1 : 0 : 0
    }
    //al final de subscribe --> servicio completo se abre el modal
    //el setTimeout simula el tiempo de consulta del servicio y una vez finalizada la consulta
    // se abre el modal
    setTimeout(() => {
      this.ModalFiltroSegundoNivelComponent.abrirModal();
    }, 100);
  }

  abrirModal() {
    this.filtroPrimerNivel.nativeElement.classList.toggle('show');
    if (this.platform.IOS || this.platform.SAFARI) {
      var body = (document.getElementsByTagName('body') as HTMLCollectionOf<HTMLElement>)[0];
      body.classList.toggle('contenido-body');
    }
  }

  itemFiltroNivelDos(data: ContenidoModalFiltroInterface) {
    this.filtersSelected = this.filtrosService.Filters?.filters != null ? this.filtrosService.Filters.filters : {};
    if (this.filtroInicial == 'categorias' || this.filtroInicial == 'subCategorias') {
      this.filtersSelected[this.filtroInicial] = { 'nombre': data.item }
    } else {
      this.filtersSelected[this.filtroInicial] = data.item;
    }

    this.actualizarBusqueda();
  }

  eliminarFiltro(item:string) {
    delete this.filtersSelected[item];

    this.actualizarBusqueda();
  }

  actualizarBusqueda() {
    this.filtrosService.Filters = {
      filters: this.filtersSelected,
      pageNumber: 1,
      pageSize: 10,
      search: this.busqueda,
      sort: "",
      seccion: this.seccion
    }
  }

  ngOnDestroy() {
    this.resultadosSubscription.unsubscribe();
  }

}
