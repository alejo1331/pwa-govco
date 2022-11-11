import { Component, OnInit, Input } from '@angular/core';
import { LoadingService } from '../../../services/loading.service';
import { requestCodigo } from '../../../models/request-codigociiu';
import { responseCodigoPaginated } from '../../../models/response-codigo-paginated';
import { CodigoCIIU } from '../../../models/codigo-ciiu';
import { BackendApiService } from '../../../services/backend-api.service';

@Component({
  selector: 'app-tabla-codigos-ciiu',
  templateUrl: './tabla-codigos-ciiu.component.html',
  styleUrls: ['./tabla-codigos-ciiu.component.scss'],
})
export class TablaCodigosCiiuComponent implements OnInit {
  @Input() CodigosCIIU: CodigoCIIU[];
  @Input() MunicipioSeleccionado: string;
  @Input() DepartamentoSeleccionado: string;
  @Input() totalRegistros: number;
  @Input() filtroBusqueda: string;
  @Input() page: number;
  @Input() pageSize: number;

  public ordenar: boolean = false;
  public ordenamiento: string = 'sinOrden';
  public nombreColumna: string;
  public ascendente: boolean = true;
  public descendente: boolean = true;
  public ordenarNombre: boolean = false;
  public ascendenteNombre: boolean = true;
  public descendenteNombre: boolean = true;
  public desc: boolean = false;
  public columnOrder: string = '';
  public pagina = '1';
  public data: CodigoCIIU[];
  public codigoActividades: CodigoCIIU[];

  constructor(
    private service: BackendApiService,
    private loadingService: LoadingService
  ) {}

  ngOnInit(): void {
    this.data = this.CodigosCIIU;
  }

  startLoading(e: any) {
    this.loadingService.startLoading();
  }

  stopLoading(e: any) {
    this.loadingService.stopLoading();
  }

  public onPaginatorChange(number: any) {
    this.page = number;
    this.pagina = number.toString();
    let request = new requestCodigo();
    request.IdDepartamento = this.DepartamentoSeleccionado;
    request.IdMunicipio = this.MunicipioSeleccionado;
    request.filtro = this.filtroBusqueda;
    request.descending = this.desc;
    request.fieldOrder = this.columnOrder;
    request.pageSize = this.pageSize;
    request.numPage = this.page;
    this.cargarActividadesValidadasPromise(request);
    this.loadingService.startLoading();
  }

  cargarActividadesValidadasPromise(val: requestCodigo) {
    let promise = new Promise<responseCodigoPaginated>((resolve, reject) => {
      this.service
        .getCodigosCIIUValidadosPorTramite(val)
        .toPromise()
        .then((res) => {
          if (res) {
            this.codigoActividades = [];
            this.data = res.data;
            this.loadingService.stopLoading();
          } else {
            this.loadingService.stopLoading();
          }
        })
        .catch((e) => {
          this.loadingService.stopLoading();
        });
    });
    return promise;
  }

  Ordenar(columna: string) {
    this.columnOrder = columna;
    if (this.ordenamiento === 'desc') {
      this.ordenamiento = 'asc';
      if (columna === 'codigo') {
        this.nombreColumna = 'codigo';
      } else {
        this.nombreColumna = 'nombre';
      }
    } else {
      this.ordenamiento = 'desc';
      if (columna === 'codigo') {
        this.nombreColumna = 'codigo';
      } else {
        this.nombreColumna = 'nombre';
      }
    }

    if (this.nombreColumna === 'codigo' && this.ordenamiento === 'asc') {
      this.ordenar = true;
      this.ascendente = false;
      this.descendente = true;
    } else if (this.nombreColumna !== 'nombre') {
      this.ordenar = true;
      this.ascendente = true;
      this.descendente = false;
    } else {
      this.ordenar = false;
      this.ascendente = true;
      this.descendente = true;
    }

    if (this.nombreColumna === 'nombre' && this.ordenamiento === 'asc') {
      this.ordenarNombre = true;
      this.ascendenteNombre = false;
      this.descendenteNombre = true;
    } else if (this.nombreColumna !== 'codigo') {
      this.ordenarNombre = true;
      this.ascendenteNombre = true;
      this.descendenteNombre = false;
    } else {
      this.ordenarNombre = false;
      this.ascendenteNombre = true;
      this.descendenteNombre = true;
    }
    if (this.ordenamiento == 'asc') {
      this.desc = false;
    } else if (this.ordenamiento == 'desc') {
      this.desc = true;
    } else {
      this.desc = false;
    }
    let request = new requestCodigo();
    request.IdDepartamento = this.DepartamentoSeleccionado;
    request.IdMunicipio = this.MunicipioSeleccionado;
    request.filtro = this.filtroBusqueda;
    request.descending = this.desc;
    request.fieldOrder = columna;
    request.pageSize = this.pageSize;
    request.numPage = this.page;
    this.cargarActividadesValidadasPromise(request);
    this.loadingService.startLoading();
  }
}
