import { AfterViewInit, Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { ResultadoFiltro } from '../../models/resultadoFiltroModel';
import { FiltrosService } from '../../services/filtros.service';
import { Subscription } from 'rxjs';
import { BottomMenuService } from 'src/app/transversales/services/bottom-menu/bottom-menu.service';
import { HeaderService } from 'src/app/transversales/services/header-service/header.service';
import { SidenavService } from 'src/app/transversales/services/sidenav-service/sidenav-service.service';
import { BuscadorService, BuscadorParams } from '../../services/buscador.service';
import { Router } from '@angular/router';
import { Filter, FiltroBusqueda } from '../../models/filtroBusquedaModel';

@Component({
  selector: 'app-buscador-principal',
  templateUrl: './buscador-principal.component.html',
  styleUrls: ['./buscador-principal.component.scss'],
})
export class BuscadorPrincipalComponent implements OnInit, AfterViewInit {
  @ViewChild('resultados') resultados: ElementRef;

  filterSubscription: Subscription;
  resultadosBusqueda: ResultadoFiltro;
  dataResultado: any = [];
  seccion: string = '';
  cantidadResultados: number;
  departamento: { codigoDepartamento: number };
  municipio: { codigoMunicipio: number };
  loading: boolean;
  filters: any;

  constructor(
    protected filtrosService: FiltrosService,
    public bottomService: BottomMenuService,
    protected servicioHeader: HeaderService,
    protected servicioSideNav: SidenavService,
    private buscadorService: BuscadorService,
    private router: Router,
  ) {
    this.bottomService.putOcultandoBottomMenu(false);
  }

  ngOnInit(): void {
    if (!this.buscadorService.getBuscadorParams.txtInputBuscador) {
      this.activarSpinner(false);
      this.router.navigate(['/']);
      return;
    }

    // servicioHeader.estadoHeader(a, b)       a -> true = header seccion internas
    //                                         a -> false = header general
    //                                         b -> Muestra/Oculta  Header
    //bottomService.seleccionandoItem(0)       0 -> Activa boton incio del menu inferior
    //                                         1, 2, 3 -> Tramites, Ingresa
    //servicioSideNav.seleccionandoItem(a, b)  a -> Activa o inactiva menu lateral
    //                                         b -> String con el valor del item a seleccionar
    //bottomService.ajustandoPantalla(true)    true -> Agrega clase de css para ajustar
    //                                                 la pantalla cuando en la seccion
    //                                                 consultada no tiene header

    this.servicioHeader.estadoHeader(false, true);
    this.bottomService.desactivarSeleccion();
    this.bottomService.ajustandoPantalla(false);
    this.servicioSideNav.seleccionandoItem(false, 'null');
    (document.getElementById('topScroll') as HTMLElement).style.top = '7.25rem';
    (document.getElementById('topScroll') as HTMLElement).scrollTop = 0;

    this.filterSubscription = this.filtrosService.getFilters$.subscribe(
      async (data: FiltroBusqueda | undefined) => {
        if (data == undefined) {
          return;
        }
        this.dataResultado = [];
        this.loading = true;
        if (data.spinner) {
          this.activarSpinner(true);
        }

        try {
          let resultado: ResultadoFiltro;
          if (data.search !== "") {
            resultado = await this.filtrosService.obtenerResultadoFiltro(data).toPromise();
          } else {
            resultado = this.filtrosService.EmptyData;
          }
          this.filters = {
            departamento: data?.filters?.departamento,
            municipio: data?.filters?.municipio
          };

          // Se almacena la respuesta de la búsqueda
          this.resultadosBusqueda = resultado;
          this.filtrosService.ResultadoBusqueda = resultado;
          this.dataResultado = this.resultadosBusqueda.data.length > 0 ? this.resultadosBusqueda.data : [];
          this.cantidadResultados = resultado.total;
        } catch (error) {
          console.error(error);
        } finally {
          this.activarSpinner(false);
          this.loading = false;
        }
      }
    );

    this.buscadorService.getBuscadorParams$.subscribe(
      (parametros: BuscadorParams) => {
        this.seccion = parametros.txtConsumoApi;
        this.filtrosService.setFilters = {
          filters: this.filters,
          pageNumber: 1,
          pageSize: 5,
          search: parametros.txtInputBuscador,
          sort: '',
          seccion: parametros.txtConsumoApi,
          spinner: false,
        };
      }
    );

  }

  ngAfterViewInit(): void {
    let barraGeolocalizador: HTMLElement = (document.getElementsByClassName('barra-geolocalizacion-pwa-govco') as HTMLCollectionOf<HTMLElement>)[0];
    if (barraGeolocalizador) {
      barraGeolocalizador.removeAttribute('style');
      barraGeolocalizador.classList.add('fixed');
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
