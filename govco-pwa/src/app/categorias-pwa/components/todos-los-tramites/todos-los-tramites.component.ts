import { Component, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';
import { FiltrosTramitesService } from '../../services/filtros-tramites/filtros-tramites.service';
import { FiltroBusquedaTramites } from '../../Models/filtroBusquedaTramitesModel';
import { ResultadoFiltroTramites } from '../../Models/resultadoFiltroTramitesModel';

@Component({
  selector: 'app-todos-los-tramites',
  templateUrl: './todos-los-tramites.component.html',
  styleUrls: ['./todos-los-tramites.component.scss']
})
export class TodosLosTramitesComponent implements OnInit {

  dataResultado: any = [];
  cantidadResultados: number;
  filterSubscription: Subscription;
  resultadosBusqueda: ResultadoFiltroTramites;
  loading: boolean;
  filters: any;

  constructor(    
    protected filtrosService: FiltrosTramitesService,
  ) { }

  ngOnInit(): void {
    this.cantidadResultados = 0;
    this.initializeParameters();
    this.suscripcionFilter();

    // this.filtrosService.setAbrirAviso = true;
  }

  initializeParameters() {    
    const departamento = localStorage.getItem("codigoDepartamento");
    const municipio = localStorage.getItem("codigoMunicipio");
    
    let filtros: FiltroBusquedaTramites = {
      pageNumber: 1,
      pageSize: 5,
      search: "  ",
      filters: {
        categorias: {
          nombre: "Quiero viajar por colombia"
        },
        tipocategorias: {
          sigla: "MV"
        }
      },
      sort: ""
    }

    if (departamento && municipio) {
      filtros.filters!.departamento = { codigoDepartamento: parseInt(departamento) };
      filtros.filters!.municipio = { codigoMunicipio: parseInt(municipio) };
    }

    this.filtrosService.setFilters = filtros;
  }

  suscripcionFilter() {
    this.filterSubscription = this.filtrosService.getFilters$.subscribe(
      async (data: FiltroBusquedaTramites | undefined) => {
        
        if (data == undefined) {
          return;
        }
        this.loading = true;

        if (data.pageNumber == 1) {
          this.cantidadResultados = 0;
          this.dataResultado = [];
        }

        if (data.spinner) {
          this.activarSpinner(true);
        }

        this.realizarBusqueda(data);
      }
    );
  }

  async realizarBusqueda(data: FiltroBusquedaTramites) {
    try {
      let resultado: ResultadoFiltroTramites = await this.filtrosService.obtenerResultadoFiltro(data).toPromise();

      this.filters = {
        departamento: data?.filters?.departamento,
        municipio: data?.filters?.municipio
      };

      // Se almacena la respuesta de la búsqueda
      this.resultadosBusqueda = resultado;
      this.filtrosService.ResultadoBusqueda = resultado;
      this.dataResultado = this.resultadosBusqueda.data.length > 0 ? this.resultadosBusqueda.data : [];

      if (this.dataResultado.length > 0) {
        this.cantidadResultados = resultado.total;
      } else {
        this.cantidadResultados = 0;
      }
    } catch (error) {
      console.error(error);
    } finally {
      this.activarSpinner(false);
      this.loading = false;
    }
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
    if (this.filterSubscription) {
      this.filterSubscription.unsubscribe();
    }
  }

}
