import { Component, OnInit, Input, ViewChild, ElementRef } from '@angular/core';
import { DATA_FILTRO_SECCIONES } from '../../models/dataFiltroSeccionesModel';
import { FiltrosService } from '../../services/filtros.service';
import { ModalFiltroSegundoNivelComponent } from '../../../biblioteca-pwa/components/modal-filtro-segundo-nivel/modal-filtro-segundo-nivel.component';
import { ContenidoModalFiltroInterface, InformacionModalInterface } from '../../../biblioteca-pwa/models/filtro-nivel-dos/filtro-nivel-dos-interface';
import { Subscription } from 'rxjs';
import { Platform } from '@angular/cdk/platform';
import { DataFiltros, ResultadoFiltro } from '../../models/resultadoFiltroModel';
import { filter } from '../../models/filtroBusquedaModel';
import { MatDialog } from '@angular/material/dialog';
import { ModalUrlNoDisponibleComponent } from 'src/app/biblioteca-pwa/components/modal-url-no-disponible/modal-url-no-disponible.component';

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
  private filtroSeleccionado = '';  
  public seccion = '';
  public busqueda = '';
  public filtrosSeleccionados:filter = {};

  constructor(
    protected filtrosService: FiltrosService,
    public platform: Platform,
    public dialog: MatDialog
  ) { }

  ngOnInit(): void {
    this.seccion = this.filtrosService.Filters?.seccion ? this.filtrosService.Filters?.seccion : '';
    this.busqueda = this.filtrosService.Filters?.search ? this.filtrosService.Filters?.search : '';

    this.resultadosSubscription = this.filtrosService.ResultadoBusqueda$.subscribe((resultados) => {
      if (resultados) {
        this.resultadosBusqueda = resultados;
        this.actualizaFiltrosActivos();
      }
    });
    
    // this.dialog.open(ModalUrlNoDisponibleComponent, {
    //   width: '280px'
    // });    
    this.clickBackdrop();
    document.addEventListener('keydown', (event) => {
      if (event.key == 'Escape') {
        this.filtroPrimerNivel.nativeElement.classList.remove('show');
      }
    }, false);
  }

  clickBackdrop() {
    let th = this;
    $('.backdrop-filtros').on("click", function(event) {
      const container = $(".container-filtros");
      if ($(event.target).closest(container).length == 0 && !event.target.classList.contains('delete-selection')) {
        th.filtroPrimerNivel.nativeElement.classList.toggle('show');
      }
    });
  }

  actualizaFiltrosActivos() {
    const filtrosResultadoBusqueda = this.resultadosBusqueda.filtros[0];
    this.seccionFiltros[this.seccion].forEach((element: { active: boolean; id: string, padre:string }) => {
      let condicionPadre = true;
      if (element.padre) {
        condicionPadre = this.filtrosSeleccionados[element.padre] != undefined;
      }
      element.active = filtrosResultadoBusqueda[element.id].length > 0 && condicionPadre;
    });
  }

  seleccionaFiltroNivelUno(idFiltro: string, tituloFiltro: string, event:any) {
    if (event.target.classList.contains('information') || event.target.classList.contains('delete-selection')) {
      return false;
    }

    this.filtroSeleccionado = idFiltro;    
    let subFiltroSeleccionado = '';

    if (this.filtrosSeleccionados != null && this.filtrosSeleccionados[idFiltro]) {
      subFiltroSeleccionado = this.filtroSeleccionado == 'categorias' || this.filtroSeleccionado == 'subCategorias' ? this.filtrosSeleccionados[idFiltro].nombre : this.filtrosSeleccionados[idFiltro];
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
    this.filtrosSeleccionados = this.filtrosService.Filters?.filters != null ? this.filtrosService.Filters.filters : {};
    if (this.filtroSeleccionado == 'categorias' || this.filtroSeleccionado == 'subCategorias') {
      this.filtrosSeleccionados[this.filtroSeleccionado] = { 'nombre': data.item }
    } else {
      this.filtrosSeleccionados[this.filtroSeleccionado] = data.item;
    }

    this.actualizarBusqueda();
  }

  eliminarFiltro(item:string) {
    delete this.filtrosSeleccionados[item];

    if (item == 'categorias') {
      delete this.filtrosSeleccionados['subCategorias'];
    } else if (item == 'anioPublicacionFiltro') {
      delete this.filtrosSeleccionados['mesPublicacionFiltro'];
    }

    this.actualizarBusqueda();
  }

  limpiarFiltros() {
    this.filtrosSeleccionados = {};
    this.actualizarBusqueda();
  }

  actualizarBusqueda() {
    this.filtrosService.Filters = {
      filters: this.filtrosSeleccionados,
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
