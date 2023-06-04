import { AfterViewInit, Component, ElementRef, EventEmitter, OnInit, Output, ViewChild } from '@angular/core';
import { Filter } from 'src/app/buscador-pwa/models/filtroBusquedaModel';
import { BuscadorParams, BuscadorService } from 'src/app/buscador-pwa/services/buscador.service';
import { FiltrosService } from 'src/app/buscador-pwa/services/filtros.service';
import { ModalInterface } from 'src/app/modal-natvivo/models/modal-interface';
import { MunicipioInterface } from '../../models/geolocalizacion/municipio-interface';
import { GeolocalizacionService } from '../../services/geolocalizacion/geolocalizacion.service';
import { HeaderService } from '../../services/header-service/header.service';
import { FiltrosTramitesService } from 'src/app/categorias-pwa/services/filtros-tramites/filtros-tramites.service';

@Component({
  selector: 'app-geolocalizacion',
  templateUrl: './geolocalizacion.component.html',
  styleUrls: ['./geolocalizacion.component.css']
})
export class GeolocalizacionComponent implements OnInit, AfterViewInit {

  // ElementRef para el focus
  @ViewChild('contenidoHtml') contenidoHtml: ElementRef;
  @ViewChild('boton') boton: ElementRef;
  modalClasico: ModalInterface;

  @Output() abrir = new EventEmitter<string[]>();

  ubicacionMunicipio: string;
  ocultar: boolean = false;
  txtInputBuscador: string;
  txtConsumoApi: string;
  aplicaGeoreferenciacion: string;
  filters: Filter;

  constructor(
    protected ServicioGeolocalizacion: GeolocalizacionService,
    protected servicioHeader: HeaderService,
    private filtrosService: FiltrosService,
    private filtrosTramitesService: FiltrosTramitesService,
    private buscadorService: BuscadorService
  ) { }

  ngOnInit(): void {
    this.servicioHeader.ocultandoHeader.subscribe(estado => {
      this.ocultar = estado[1];
    })

    this.buscadorService.getBuscadorParams$.subscribe(
      (parametros: BuscadorParams) => {
        this.txtConsumoApi = parametros.txtConsumoApi;
        this.txtInputBuscador = parametros.txtInputBuscador;
        this.aplicaGeoreferenciacion = parametros.aplicaGeoreferenciacion;
      }
    );

    this.ServicioGeolocalizacion.getUbicacion.subscribe(([codigoDepartamento, codigoMunicipio]) => {
      switch (codigoDepartamento) {
        case 'null':
          this.ubicacionMunicipio = 'Ingresa tu ubicación'
          break;
        case 'TodosLosDepartamentos':
          this.ubicacionMunicipio = 'Información para Toda Colombia';
          break;
        default:
          this.getMunicipiosPorDepartamento([codigoDepartamento, codigoMunicipio])
          break;
      }

      switch (this.aplicaGeoreferenciacion) {
        case 'si':
          if (codigoDepartamento != 'TodosLosDepartamentos' && codigoMunicipio != 'null') {
            this.filters = {
              departamento: { 'codigoDepartamento': Number(codigoDepartamento) },
              municipio: { 'codigoMunicipio': Number(codigoMunicipio) }
            };
          } else {
            this.filters = {
              departamento: null,
              municipio: null
            };
          }
          break;
        case 'no':
          this.filters = {
            departamento: null,
            municipio: null
          };
          break;
      }

      this.filtrosService.setFilters = {
        filters: this.filters,
        pageNumber: 1,
        pageSize: 5,
        search: this.txtInputBuscador,
        sort: '',
        seccion: this.txtConsumoApi,
        spinner: false,
      };

      this.actualizarFiltroTramites();
    })
  }

  actualizarFiltroTramites() {
    const filtrosSeleccionados = this.filtrosTramitesService.getFilters;
    this.filters.categorias = filtrosSeleccionados?.filters?.categorias;
    this.filters.tipocategorias = filtrosSeleccionados?.filters?.tipocategorias;
    
    this.filtrosTramitesService.setFilters = {
      filters: this.filters,
      pageNumber: 1,
      pageSize: 5,
      search: ' ',
      sort: '',
      spinner: false,
    };
  }

  ngAfterViewInit(): void {
    const departamento = localStorage.getItem("codigoDepartamento");
    const municipio = localStorage.getItem("codigoMunicipio");

    if (departamento && municipio) {
      this.ServicioGeolocalizacion.setUbicacion(departamento, municipio);
    }
  }

  getMunicipiosPorDepartamento([codigoDepartamento, codigoMunicipio]: [string, string]) {
    this.ServicioGeolocalizacion.cacheJsonMunicipiosPorDepartamento(codigoDepartamento)
      .then(existe => {
        if (existe) {
          this.ServicioGeolocalizacion.getCacheJsonMunicipiosPorDepartamento(codigoDepartamento)
            .then((municipios: MunicipioInterface[]) => {
              var municipioSeleccionado = municipios.filter((elemento: any) => { return elemento.codigo === codigoMunicipio })[0]
              this.ubicacionMunicipio = 'Información para ' + municipioSeleccionado.nombre;
            })
        } else {
          this.ServicioGeolocalizacion.getMunicipiosPorDepartamento(codigoDepartamento)
            .subscribe((municipios: MunicipioInterface[]) => {
              var municipioSeleccionado = municipios.filter((elemento: any) => { return elemento.codigo === codigoMunicipio })[0]
              this.ubicacionMunicipio = 'Información para ' + municipioSeleccionado.nombre;
            });
        }
      })
  }

  abrirFormularioGeo() {
    this.abrir.emit(['translate(0%)', 'translate(-100%)']);
  }

}
