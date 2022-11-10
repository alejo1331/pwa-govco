import { Component, OnInit } from '@angular/core';
import { AppComponent } from 'src/app/app.component';
import { MunicipioInterface } from './../../../transversales/models/geolocalizacion/municipio-interface';
import { GeolocalizacionService } from './../../../transversales/services/geolocalizacion/geolocalizacion.service';
import {
  BuscadorService,
  BuscadorParams,
} from 'src/app/buscador-pwa/services/buscador.service';
import { ItemsBuscador } from 'src/variables-globales/items-buscador';

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
  codDepartamento: string = '';
  codMunicipio: string = '';
  resIndex: number;
  resConsumoApi = '';

  constructor(
    private appprincipal: AppComponent,
    protected ServicioGeolocalizacion: GeolocalizacionService,
    private buscadorService: BuscadorService
  ) {}

  ngOnInit(): void {
    if (localStorage.getItem('codigoDepartamento')) {
      this.codDepartamento = localStorage.getItem('codigoDepartamento')!;
      this.codMunicipio = localStorage.getItem('codigoMunicipio')!;
      this.getMunicipiosPorDepartamento([
        this.codDepartamento,
        this.codMunicipio,
      ]);
    }

    this.buscadorService.getSugerenciasBuscador$.subscribe(
      (sugerencias: any) => {
        if (sugerencias.length > 0) this.sugBuscador = sugerencias[0][0];
        else this.sugBuscador = '';
      }
    );

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

  getMunicipiosPorDepartamento([codigoDepartamento, codigoMunicipio]: [
    string,
    string
  ]) {
    this.ServicioGeolocalizacion.cacheJsonMunicipiosPorDepartamento(
      codigoDepartamento
    ).then((existe) => {
      if (existe) {
        this.ServicioGeolocalizacion.getCacheJsonMunicipiosPorDepartamento(
          codigoDepartamento
        ).then((municipios: MunicipioInterface[]) => {
          let municipioSeleccionado = municipios.filter((elemento: any) => {
            return elemento.codigo === codigoMunicipio;
          })[0];
          this.geoLocMunName = municipioSeleccionado.nombre.toUpperCase();
        });
      }
    });
  }

  seleccionarSugerencia() {
    const nuevoBuscadorParams: BuscadorParams = {
      index: this.resIndex,
      txtConsumoApi: this.resConsumoApi,
      txtInputBuscador: this.sugBuscador,
      aplicaGeoreferenciacion: ItemsBuscador[this.resIndex].aplicaGeoreferenciacion

    };
    this.buscadorService.setBuscadorParams(nuevoBuscadorParams);
  }
}
