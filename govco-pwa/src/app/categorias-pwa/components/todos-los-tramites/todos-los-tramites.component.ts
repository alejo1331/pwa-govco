import { Component, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';
import { FiltrosTramitesService } from '../../services/filtros-tramites/filtros-tramites.service';
import { FiltroBusquedaTramites } from '../../Models/filtroBusquedaTramitesModel';
import { ResultadoFiltroTramites } from '../../Models/resultadoFiltroTramitesModel';
import { GeolocalizacionViewService } from 'src/app/transversales/services/geolocalizacion-view/geolocalizacion-view.service';
import { GeolocalizacionService } from 'src/app/transversales/services/geolocalizacion/geolocalizacion.service';

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
  private getUbicacion: Subscription;
  filters: any;

  constructor(    
    protected filtrosService: FiltrosTramitesService,
    protected serviceGeoView: GeolocalizacionViewService,
    protected ServicioGeolocalizacion: GeolocalizacionService
  ) { }

  ngOnInit(): void {
    this.cantidadResultados = 0;
    this.initializeParameters();
    this.suscripcionFilter();
    // this.suscripcionGeolocalizacion();
  }

  initializeParameters() {

    // const geolocalizacion = this.ServicioGeolocalizacion.getUbicacion;
    // console.log('geolocalizacion', geolocalizacion.)
    this.filtrosService.setFilters = {
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
  }

  suscripcionFilter() {
    this.filterSubscription = this.filtrosService.getFilters$.subscribe(
      async (data: FiltroBusquedaTramites | undefined) => {
        console.log('data', data)
        
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

  suscripcionGeolocalizacion() {
    this.getUbicacion = this.serviceGeoView.getUbicacion$.subscribe((data: any) => {
      console.log('suscripcionGeolocalizacion', data)
      const filtrosSeleccionados = this.filtrosService.getFilters;

      this.filtrosService.setFilters = {
        filters: {
          categorias: filtrosSeleccionados?.filters?.categorias,
          tipocategorias: filtrosSeleccionados?.filters?.tipocategorias,        
          departamento: data.codigoDepartamento && data.codigoMunicipio != "TodosLosMunicipios" && data.codigoMunicipio != '' ? { 'codigoDepartamento': parseInt(data.codigoDepartamento) } : undefined,
          municipio: data.codigoMunicipio && data.codigoMunicipio != "TodosLosMunicipios" ? { 'codigoMunicipio': parseInt(data.codigoMunicipio) } : undefined
        },
        pageNumber: 1,
        pageSize: 5,
        search: ' ',
        sort: '',
        spinner: true,
      };

      this.cantidadResultados = 0;
      this.dataResultado = [];
      this.activarSpinner(true);
    });
  }

  async realizarBusqueda(data: FiltroBusquedaTramites) {
    try {
      let resultado: ResultadoFiltroTramites = await this.filtrosService.obtenerResultadoFiltro(data).toPromise();
      console.log('resultado', resultado)

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
