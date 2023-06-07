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
  departamento: any;
  municipio: any;
  mostrarAvisoModal:boolean = false;

  constructor(    
    protected filtrosService: FiltrosTramitesService,
  ) { }

  ngOnInit(): void {
    this.cantidadResultados = 0;
    this.departamento = localStorage.getItem("codigoDepartamento");
    this.municipio = localStorage.getItem("codigoMunicipio");

    this.initializeParameters();
    this.suscripcionFilter();
    this.mostrarModalAvisoSinResultados();
  }

  initializeParameters() {        
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

    if (this.departamento && this.municipio) {
      filtros.filters!.departamento = { codigoDepartamento: parseInt(this.departamento) };
      filtros.filters!.municipio = { codigoMunicipio: parseInt(this.municipio) };
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

        this.search(data);
      }
    );
  }

  async search(data: FiltroBusquedaTramites) {
    try {
      let resultado: ResultadoFiltroTramites = await this.filtrosService.obtenerResultadoFiltro(data).toPromise();

      this.filters = {
        departamento: data?.filters?.departamento,
        municipio: data?.filters?.municipio
      };

      // Se almacena la respuesta de la búsqueda
      this.resultadosBusqueda = resultado;
      this.filtrosService.ResultadoBusqueda = resultado;
      // this.dataResultado = [];
      this.dataResultado = this.resultadosBusqueda.data.length > 0 ? this.resultadosBusqueda.data : [];

      if (this.dataResultado.length > 0) {
        this.cantidadResultados = resultado.total;
      } else {
        this.checkFilters(data);
        this.cantidadResultados = 0;
      }

        
      // const elementSubcategorias = document.querySelector('.modal-desplegable-pwa .container-header p');
      // elementSubcategorias?.scrollIntoView({ inline: "start", block: "start" });
    } catch (error) {
      console.error(error);
    } finally {
      this.activarSpinner(false);
      this.loading = false;
    }
  }

  checkFilters(data: FiltroBusquedaTramites) {
    let totalFiltros = 0;
    if (data?.filters != undefined) {
      Object.entries(data?.filters).forEach(element => {
        if (element[0] != "departamento" && element[0] != "municipio" && 
          element[0] != "categorias" && element[0] != "tipocategorias") {
          totalFiltros += element[1] != undefined ? 1 : 0
        }
      })
    }

    if (totalFiltros > 0) {
      this.filtrosService.setAbrirAviso = true;
      this.initializeParameters();
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

  mostrarModalAvisoSinResultados() {
    this.filtrosService.getAbrirAvisor$.subscribe(
      (abrir: boolean) => {
        this.mostrarAvisoModal = abrir;
      }
    );
  }

  ngOnDestroy() {
    if (this.filterSubscription) {
      this.filterSubscription.unsubscribe();
    }
  }

}
