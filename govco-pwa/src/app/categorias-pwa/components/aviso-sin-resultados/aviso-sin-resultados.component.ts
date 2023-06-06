import { Component, OnInit } from '@angular/core';
import { AppComponent } from 'src/app/app.component';
import { MunicipioInterface } from './../../../transversales/models/geolocalizacion/municipio-interface';
import { GeolocalizacionService } from './../../../transversales/services/geolocalizacion/geolocalizacion.service';
import {
  BuscadorService,
  BuscadorParams,
} from 'src/app/buscador-pwa/services/buscador.service';
import { ItemsBuscador } from 'src/variables-globales/items-buscador';
import { DepartamentoInterface } from 'src/app/transversales/models/geolocalizacion/departamento-interface';
import { Subscription } from 'rxjs';
import { FiltrosTramitesService } from '../../services/filtros-tramites/filtros-tramites.service';
import { FiltroBusquedaTramites } from '../../Models/filtroBusquedaTramitesModel';

@Component({
  selector: 'app-aviso-sin-resultados',
  templateUrl: './aviso-sin-resultados.component.html',
  styleUrls: ['./aviso-sin-resultados.component.scss']
})
export class AvisoSinResultadosComponent implements OnInit {
  imageSrc = '../../../../assets/images/imgaviso.png';
  resBuscador = 'Ebuxación';
  geoLocMunName = 'Toda Colombia';
  sugBuscador = '';
  resConsumoApi = '';
  filterSubscription: Subscription;
  totalFiltros: number = 0;

  constructor(
    private appprincipal: AppComponent,
    protected ServicioGeolocalizacion: GeolocalizacionService,
    private buscadorService: BuscadorService,
    private filtrosService: FiltrosTramitesService
  ) { }

  ngOnInit(): void {
    this.filterSubscription = this.filtrosService.getFilters$.subscribe(
      async (data: FiltroBusquedaTramites | undefined) => {
        let codDepartamento: string, codMunicipio: string;
        codDepartamento = localStorage.getItem('codigoDepartamento')!;
        codMunicipio = localStorage.getItem('codigoMunicipio')!;
        this.getMunicipiosPorDepartamento([codDepartamento, codMunicipio]);

        this.totalFiltros = 0;
        if (data?.filters != undefined) {
          Object.entries(data?.filters).forEach(element => {
            if (element[0] != "departamento" && element[0] != "municipio" && 
              element[0] != "categorias" && element[0] != "tipocategorias") {
              this.totalFiltros += element[1] != undefined ? 1 : 0
            }
          })
        }
      });
  }

  abrirGeolocalizacion() {
    this.appprincipal.formularioGeolocalizacion([
      'translate(0%)',
      'translate(-100%)',
    ]);
  }

  async getMunicipiosPorDepartamento([codigoDepartamento, codigoMunicipio]: string[]) {
    let departamentoSeleccionado: DepartamentoInterface;
    if (codigoDepartamento != 'TodosLosDepartamentos') {
      let departamentos: DepartamentoInterface[] = await this.ServicioGeolocalizacion.getCacheJsonDepartamentos();
      departamentoSeleccionado = departamentos.filter(
        (data: DepartamentoInterface) => {
          return data.codigo === codigoDepartamento;
        }
      )[0];

      let existe = await this.ServicioGeolocalizacion.cacheJsonMunicipiosPorDepartamento(codigoDepartamento);
      if (existe) {
        this.getMunicipios([codigoDepartamento, codigoMunicipio], departamentoSeleccionado);
      }
    } else {
      this.geoLocMunName = 'Toda Colombia';
    }
  }

  getMunicipios([codigoDepartamento, codigoMunicipio]: string[], departamentoSeleccionado:DepartamentoInterface) {
    let municipioSeleccionado;
    this.ServicioGeolocalizacion.getCacheJsonMunicipiosPorDepartamento(
      codigoDepartamento
    ).then((municipios: MunicipioInterface[]) => {
      if (municipios) {
        municipioSeleccionado = municipios.filter((elemento: any) => {
          return elemento.codigo === codigoMunicipio;
        })[0];
        this.geoLocMunName =
          codigoMunicipio === '11001'
            ? this.capitalizeGeo(municipioSeleccionado.nombre.toLowerCase())
            : this.capitalizeGeo(departamentoSeleccionado.nombre.toLowerCase()) +
            ', ' +
            this.capitalizeMunicipio(municipioSeleccionado.nombre.toLowerCase());
      }
    });
  }

  capitalizeGeo(str: string) {
    return str.charAt(0).toUpperCase() + str.slice(1);
  }

  capitalizeMunicipio(str: string) {
    let municipio = str.split(' ');
    let municipioMod = municipio.map((letter) => {
      if (!(letter == 'de' || letter == 'del')) {
        return this.capitalizeGeo(letter);
      } else {
        return letter;
      }
    });
    return municipioMod.join(' ');
  }

  ngOnDestroy() {
    if (this.filterSubscription) {
      this.filterSubscription.unsubscribe();
    }
  }
}
