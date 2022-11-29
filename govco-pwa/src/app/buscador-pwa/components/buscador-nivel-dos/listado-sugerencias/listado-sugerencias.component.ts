import { Component, OnInit, ViewEncapsulation } from '@angular/core';
import { AppComponent } from 'src/app/app.component';
import { Filter } from 'src/app/buscador-pwa/models/filtroBusquedaModel';
import { BuscadorService, BuscadorParams } from 'src/app/buscador-pwa/services/buscador.service';
import { FiltrosService } from 'src/app/buscador-pwa/services/filtros.service';
import { ItemsBuscador } from 'src/variables-globales/items-buscador';

@Component({
  selector: 'app-listado-sugerencias',
  templateUrl: './listado-sugerencias.component.html',
  styleUrls: ['./listado-sugerencias.component.scss'],
  encapsulation: ViewEncapsulation.None,
})
export class ListadoSugerenciasComponent implements OnInit {

  listadoSugerencias = []
  buscadorParams: BuscadorParams;
  matSidenavContent: HTMLElement;


  constructor(
    private buscadorService: BuscadorService,
    private appComponent: AppComponent,
    protected filtrosService: FiltrosService,
  ) { }

  ngOnInit() {
    this.buscadorService.getSugerenciasBuscador$.subscribe(
      (sugerencias: any) => {
        this.listadoSugerencias = sugerencias;
      }
    )

    this.buscadorService.getBuscadorParams$.subscribe(
      (parametros: BuscadorParams) => {
        this.buscadorParams = parametros;

        const filters: Filter = {departamento: null, municipio: null};
        if (this.filtrosService.getFilters?.filters != null) {
          filters.departamento = this.filtrosService.getFilters.filters.departamento;
          filters.municipio = this.filtrosService.getFilters.filters.municipio;
        }

        this.filtrosService.setFilters = {
          filters: filters,
          pageNumber: 1,
          pageSize: 5,
          search: parametros.txtInputBuscador,
          sort: '',
          seccion: parametros.txtConsumoApi,
          spinner: false,
        };
      }
    )

  }

  ngAfterViewInit() {
    this.matSidenavContent = (
      document.getElementsByTagName('mat-sidenav-container') as HTMLCollectionOf<HTMLElement>
    )[0];
  }

  seleccionarSugerencia(sugerencia: any) {
    const nuevoBuscadorParams: BuscadorParams = {
      index: this.buscadorParams.index,
      txtConsumoApi: this.buscadorParams.txtConsumoApi,
      txtInputBuscador: sugerencia,
      aplicaGeoreferenciacion: ItemsBuscador[this.buscadorParams.index].aplicaGeoreferenciacion
    }
    this.buscadorService.setBuscadorParams(nuevoBuscadorParams);
    this.styleOpacity();
  }

  styleOpacity() {
    this.matSidenavContent.removeAttribute('style');
    let seccionBuscador: HTMLElement = this.appComponent.seccionBuscador.nativeElement;
    seccionBuscador.classList.add('off-buscador');
    this.appComponent.seccionBuscador.nativeElement.addEventListener('animationend', function (event: Event) {
      seccionBuscador.removeAttribute('style');
      seccionBuscador.classList.remove('off-buscador');
    });
  }

}
