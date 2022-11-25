import { Component, OnInit } from '@angular/core';
import { AppComponent } from 'src/app/app.component';
import { MunicipioInterface } from './../../../transversales/models/geolocalizacion/municipio-interface';
import { GeolocalizacionService } from './../../../transversales/services/geolocalizacion/geolocalizacion.service';
import {
  BuscadorService,
  BuscadorParams,
} from 'src/app/buscador-pwa/services/buscador.service';
import { FiltrosService } from '../../services/filtros.service';
import { ItemsBuscador } from 'src/variables-globales/items-buscador';
import { DepartamentoInterface } from 'src/app/transversales/models/geolocalizacion/departamento-interface';
import { Subscription } from 'rxjs';
import { FiltroBusqueda } from '../../models/filtroBusquedaModel';

@Component({
  selector: 'app-buscador-aviso',
  templateUrl: './buscador-aviso.component.html',
  styleUrls: ['./buscador-aviso.component.scss'],
})
export class BuscadorAvisoComponent implements OnInit {
  imageSrc = '../../../../assets/images/imgaviso.png';
  resBuscador = 'Ebuxación';
  geoLocMunName = 'Toda Colombia';
  sugBuscador = '';
  resIndex: number;
  resConsumoApi = '';
  filterSubscription: Subscription;

  constructor(
    private appprincipal: AppComponent,
    protected ServicioGeolocalizacion: GeolocalizacionService,
    private buscadorService: BuscadorService,
    private filtrosService: FiltrosService
  ) { }

  ngOnInit(): void {
    this.filterSubscription = this.filtrosService.getFilters$.subscribe(
      async (data: FiltroBusqueda | undefined) => {
        let codDepartamento: string, codMunicipio: string;
        codDepartamento = localStorage.getItem('codigoDepartamento')!;
        codMunicipio = localStorage.getItem('codigoMunicipio')!;
        this.getMunicipiosPorDepartamento([codDepartamento, codMunicipio]);
      });

    this.filtrosService.ResultadoBusqueda$.subscribe((resultado: any) => {
      if (resultado?.tituloSugerido) this.sugBuscador = resultado.tituloSugerido;
      else this.sugBuscador = '';
    });

    this.buscadorService.getBuscadorParams$.subscribe(
      (parametros: BuscadorParams) => {
        this.resIndex = parametros.index;
        this.resBuscador = parametros.txtInputBuscador;
        this.resConsumoApi = parametros.txtConsumoApi;
      }
    );
  }

  abrirGeolocalizacion() {
    this.appprincipal.formularioGeolocalizacion([
      'translate(0%)',
      'translate(-100%)',
    ]);
  }

  getMunicipiosPorDepartamento([codigoDepartamento, codigoMunicipio]: string[]) {
    let departamentoSeleccionado: DepartamentoInterface;
    let municipioSeleccionado;
    if (codigoDepartamento != 'TodosLosDepartamentos') {
      this.ServicioGeolocalizacion.getCacheJsonDepartamentos().then(
        (departamentos: DepartamentoInterface[]) => {
          departamentoSeleccionado = departamentos.filter(
            (data: DepartamentoInterface) => {
              return data.codigo === codigoDepartamento;
            }
          )[0];
        }
      );
      this.ServicioGeolocalizacion.cacheJsonMunicipiosPorDepartamento(
        codigoDepartamento
      ).then((existe) => {
        if (existe) {
          this.ServicioGeolocalizacion.getCacheJsonMunicipiosPorDepartamento(
            codigoDepartamento
          ).then((municipios: MunicipioInterface[]) => {
            municipioSeleccionado = municipios.filter((elemento: any) => {
              return elemento.codigo === codigoMunicipio;
            })[0];
            this.geoLocMunName =
              codigoMunicipio === '11001'
                ? this.capitalizeGeo(municipioSeleccionado.nombre.toLowerCase())
                : this.capitalizeGeo(
                  departamentoSeleccionado.nombre.toLowerCase()
                ) +
                ', ' +
                this.capitalizeMunicipio(
                  municipioSeleccionado.nombre.toLowerCase()
                );
          });
        }
      });
    } else {
      this.geoLocMunName = 'Toda Colombia';
    }
  }

  seleccionarSugerencia() {
    const nuevoBuscadorParams: BuscadorParams = {
      index: this.resIndex,
      txtConsumoApi: this.resConsumoApi,
      txtInputBuscador: this.sugBuscador,
      aplicaGeoreferenciacion:
        ItemsBuscador[this.resIndex].aplicaGeoreferenciacion,
    };
    this.buscadorService.setBuscadorParams(nuevoBuscadorParams);
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


