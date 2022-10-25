import { Component, OnInit, Input, ViewChild } from '@angular/core';
import { DATA_FILTRO_SECCIONES } from '../../models/dataFiltroSeccionesModel';
import { FiltrosService } from '../../services/filtros.service';
import { ModalFiltroSegundoNivelComponent } from '../../../biblioteca-pwa/components/modal-filtro-segundo-nivel/modal-filtro-segundo-nivel.component';
import { ContenidoModalFiltroInterface, InformacionModalInterface } from '../../../biblioteca-pwa/models/filtro-nivel-dos/filtro-nivel-dos-interface';
import { Subscription } from 'rxjs';
import { DataFiltros, ResultadoFiltro } from '../../models/resultadoFiltroModel';
import { filter } from '../../models/filtroBusquedaModel';

@Component({
  selector: 'app-filtros-principal',
  templateUrl: './filtros-principal.component.html',
  styleUrls: ['./filtros-principal.component.scss']
})
export class FiltrosPrincipalComponent implements OnInit {
  @Input() seccion: string;
  @Input() busqueda: string;
  @ViewChild(ModalFiltroSegundoNivelComponent) modalFiltro: ModalFiltroSegundoNivelComponent;
  informacionModalFiltro: InformacionModalInterface;

  public seccionFiltros = DATA_FILTRO_SECCIONES;
  public resultadosSubscription: Subscription;
  public resultadosBusqueda:ResultadoFiltro;
  private filtroInicial = '';  

  constructor(
    protected filtrosService: FiltrosService
  ) { }

  ngOnInit(): void {  
    console.log('seccion', this.seccion);
    console.log('busqueda', this.busqueda);

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
    console.log('idFiltro', idFiltro)
    console.log('resultadosBusqueda', this.resultadosBusqueda)
    //inicia el servicio para el filtro de segundo nivel
    this.informacionModalFiltro = {
      titulo: tituloFiltro,
      contendioModal: this.resultadosBusqueda.filtros[0][idFiltro]
    }
    //al final de subscribe --> servicio completo se abre el modal
    //el setTimeout simula el tiempo de consulta del servicio y una vez finalizada la consulta
    // se abre el modal
    setTimeout(() => {
      this.modalFiltro.abrirModal();
    }, 100);
  }

  itemFiltroNivelDos(data: ContenidoModalFiltroInterface) {
    console.log('this.filtrosService.Filters', this.filtrosService.Filters)
    console.log('data', data);
    const filterSelected:filter = this.filtrosService.Filters?.filters != null ? this.filtrosService.Filters.filters : {};
    if (this.filtroInicial == 'categorias' || this.filtroInicial == 'subCategorias') {
      filterSelected[this.filtroInicial] = { 'nombre': data.item }
    } else {
      filterSelected[this.filtroInicial] = data.item;
    }

    this.filtrosService.Filters = {
      filters: filterSelected,
      pageNumber: 1,
      pageSize: 10,
      search: this.busqueda,
      sort: "",
      seccion: this.seccion
    }
    console.log('this.filtrosService.Filters', this.filtrosService.Filters)
  }

  ngOnDestroy() {
    this.resultadosSubscription.unsubscribe();
  }

}
