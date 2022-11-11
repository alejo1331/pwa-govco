import { Component, OnInit } from '@angular/core';

//models
import { Departamento } from '../../../models/departamento';
import { Municipio } from '../../../models/municipio';
import { CodigoCIIU } from '../../../models/codigo-ciiu';

//Services
import { Router } from '@angular/router';
import { BackendApiService } from '../../../services/backend-api.service';
import { LoadingService } from '../../../services/loading.service';
import { requestCodigo } from '../../../models/request-codigociiu';
import { requestHistoricoBusqueda } from '../../../models/request-historico-busqueda';
import { responseCodigoPaginated } from '../../../models/response-codigo-paginated';
import { Options } from 'select2';

@Component({
  selector: 'app-busqueda-codigos-ciiu',
  templateUrl: './busqueda-codigos-ciiu.component.html',
  styleUrls: ['./busqueda-codigos-ciiu.component.scss'],
})
export class BusquedaCodigosCiiuComponent implements OnInit {
  seleccionado: any = { codigo: '', nombre: '' };
  seleccionadoPaginas: any = { codigo: 10, nombre: 10 };
  Departamentos: Departamento[] = [];
  Municipios: Municipio[] = [];
  public DepartamentoSeleccionado: string = '0';
  public MunicipioSeleccionado: string = '0';
  public options: Options;
  public habilitar: boolean;
  HabilitarSelect: boolean = true;
  HabilitarBusqueda: boolean = true;
  HabilitarBtnBusqueda: boolean = true;
  public codigoActividades: CodigoCIIU[];
  keyword = 'nombre';
  public filtroBusqueda: string;
  public muestraMensaje: boolean;
  public codigoActividadesTabla: CodigoCIIU[];
  //Paginador
  public columnOrder: string = '';
  public desc: boolean = false;
  public page: number = 1;
  public pageSize: number = 10;
  public totalRegistros: number = 0;
  optionsSelect = [
    { codigo: 10, nombre: 10 },
    { codigo: 25, nombre: 25 },
    { codigo: 50, nombre: 50 },
  ];

  constructor(
    private service: BackendApiService,
    private router: Router,
    private loadingService: LoadingService
  ) {}

  ngOnInit(): void {
    this.habilitar = false;
    this.cargarDepartamentos();
    this.options = {
      placeholder: 'Escoja su departamento',
      allowClear: true,
      width: '100%',
    };
    this.loadingService.startLoading();
  }

  cargarDepartamentos() {
    this.service.getListDepartamento().subscribe((data) => {
      this.Departamentos = data;
      this.loadingService.stopLoading();
    });
  }

  CargarMunicipios(Id: string) {
    this.service.getListMunicipio(Id).subscribe((data) => {
      this.HabilitarSelect = false;
      this.Municipios = data;
      this.loadingService.stopLoading();
    });
  }

  startLoading(e: any) {
    this.loadingService.startLoading();
  }

  stopLoading(e: any) {
    this.loadingService.stopLoading();
  }

  public changed(e: any): void {
    if (e.detail.codigo === '') {
      this.HabilitarSelect = true;
      this.HabilitarBusqueda = true;
    } else {
      this.DepartamentoSeleccionado = e.detail.codigo;
      this.HabilitarSelect = false;
      this.CargarMunicipios(this.DepartamentoSeleccionado);
      this.loadingService.startLoading();
    }
  }

  public changedMunicipio(e: any): void {
    if (e.detail.codigo === '') {
      this.HabilitarBusqueda = true;
    } else {
      this.MunicipioSeleccionado = e.detail.codigo;
      this.HabilitarBusqueda = false;
    }
  }

  //eventos buscador
  selectEvent(item: any) {
    this.renderizarTabla();
  }

  onChangeSearch(val: string) {
    this.filtroBusqueda = val;
    if (val.length > 1) this.cargarActividadesBuscadorAsync(val);
    else {
      this.codigoActividades = [];
    }

    if (val.length > 0) {
      this.HabilitarBtnBusqueda = false;
    } else {
      this.HabilitarBtnBusqueda = true;
    }
  }

  clearEventStatic() {
    this.HabilitarBtnBusqueda = true;
    this.filtroBusqueda = '';
    this.codigoActividades = [];
    this.habilitar = false;
    this.muestraMensaje = false;
    this.codigoActividadesTabla = [];
    this.pageSize = 10;
    this.page = 1;
    this.optionsSelect = [
      { codigo: 10, nombre: 10 },
      { codigo: 25, nombre: 25 },
      { codigo: 50, nombre: 50 },
    ];
  }

  clearEventStatic2() {
    this.codigoActividades = [];
    this.habilitar = false;
    this.muestraMensaje = false;
    this.codigoActividadesTabla = [];
    this.pageSize = 10;
    this.page = 1;
    this.optionsSelect = [
      { codigo: 10, nombre: 10 },
      { codigo: 25, nombre: 25 },
      { codigo: 50, nombre: 50 },
    ];
  }

  onFocused(e: any) {
    // do something when input is focused
  }

  cargarActividadesBuscadorPromise(val: string) {
    let promise = new Promise<CodigoCIIU>((resolve, reject) => {
      this.service
        .getActividadesEconomicas(val)
        .toPromise()
        .then((res) => {
          if (res) {
            let numero = new RegExp(/[0-9]/);
            let validar = numero.exec(val);

            this.codigoActividades = res;

            if (validar == null) {
              this.keyword = 'nombre';
            } else {
              this.keyword = 'codigo';
            }
          } else {
            this.codigoActividades = [];
            this.codigoActividadesTabla = [];
          }
        })
        .catch((e) => {
          this.codigoActividades = [];
          this.codigoActividadesTabla = [];
        });
    });
    return promise;
  }

  cargarActividadesValidadasPromise(val: requestCodigo) {
    let promise = new Promise<responseCodigoPaginated>((resolve, reject) => {
      this.service
        .getCodigosCIIUValidadosPorTramite(val)
        .toPromise()
        .then((res) => {
          if (res) {
            this.codigoActividades = [];
            this.codigoActividadesTabla = res.data;
            this.totalRegistros = res.totalRecords;
            this.habilitar = true;
            this.muestraMensaje = false;
            this.loadingService.stopLoading();
          } else {
            this.habilitar = false;
            this.muestraMensaje = true;
            this.codigoActividadesTabla = [];
            this.codigoActividades = [];
            this.loadingService.stopLoading();
          }
        })
        .catch((e) => {
          this.habilitar = false;
          this.muestraMensaje = false;
          this.codigoActividades = [];
          this.codigoActividadesTabla = [];
        });
    });
    return promise;
  }

  insertarHistoricoPromise(historico: requestHistoricoBusqueda) {
    new Promise((resolve, reject) => {
      this.service
        .insertarHistoricoDeBusquedaCIIU(historico)
        .toPromise()
        .then((res) => {
          console.log(res);
        });
    });
  }

  async cargarActividadesBuscadorAsync(filtro: string) {
    return await Promise.resolve(this.cargarActividadesBuscadorPromise(filtro));
  }

  async cargarActividadesValidadasAsync(request: requestCodigo) {
    return await Promise.resolve(
      this.cargarActividadesValidadasPromise(request)
    );
  }

  async insertarHistoricoAsync(historico: requestHistoricoBusqueda) {
    return await this.insertarHistoricoPromise(historico);
  }

  public renderizarTabla() {
    if (!(this.filtroBusqueda.length > 0)) return false;
    this.loadingService.startLoading();
    let historico = new requestHistoricoBusqueda();
    historico.texto = this.filtroBusqueda;
    let request = new requestCodigo();
    request.IdDepartamento = this.DepartamentoSeleccionado;
    request.IdMunicipio = this.MunicipioSeleccionado;
    request.filtro = this.filtroBusqueda;
    request.descending = this.desc;
    request.fieldOrder = this.columnOrder;
    request.pageSize = this.pageSize;
    request.numPage = this.page;
    this.clearEventStatic2();
    this.insertarHistoricoAsync(historico);
    Promise.resolve(this.cargarActividadesValidadasPromise(request));
  }

  selectQtyPages(dato: any) {
    if (this.filtroBusqueda.length <= 0) return false;
    this.habilitar = false;
    this.muestraMensaje = false;
    this.codigoActividadesTabla = [];
    this.pageSize = dato.detail.codigo;
    this.seleccionadoPaginas = dato.detail;
    if (dato.detail.codigo == 50)
      this.optionsSelect = [
        { codigo: 50, nombre: 50 },
        { codigo: 10, nombre: 10 },
        { codigo: 25, nombre: 25 },
      ];
    else if (dato.detail.codigo == 25)
      this.optionsSelect = [
        { codigo: 25, nombre: 25 },
        { codigo: 10, nombre: 10 },
        { codigo: 50, nombre: 50 },
      ];
    else
      this.optionsSelect = [
        { codigo: 10, nombre: 10 },
        { codigo: 25, nombre: 25 },
        { codigo: 50, nombre: 50 },
      ];
    let request = new requestCodigo();
    request.IdDepartamento = this.DepartamentoSeleccionado;
    request.IdMunicipio = this.MunicipioSeleccionado;
    request.filtro = this.filtroBusqueda;
    request.descending = this.desc;
    request.fieldOrder = this.columnOrder;
    request.pageSize = dato.detail.codigo;
    request.numPage = this.page;
    this.cargarActividadesValidadasPromise(request);
    this.loadingService.startLoading();
  }
}
