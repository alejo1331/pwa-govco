import { Component, OnInit, ViewChild } from '@angular/core';
import { AppComponent } from 'src/app/app.component';
import { MunicipioInterface } from './../../../transversales/models/geolocalizacion/municipio-interface';
import { GeolocalizacionService } from './../../../transversales/services/geolocalizacion/geolocalizacion.service';

@Component({
  selector: 'app-buscador-aviso',
  templateUrl: './buscador-aviso.component.html',
  styleUrls: ['./buscador-aviso.component.scss'],
})
export class BuscadorAvisoComponent implements OnInit {
  imageSrc = '../../../../assets/images/imgaviso.png';
  resBuscador = 'Ebuxación';
  geoLocMunName = 'Toda Colombia';
  sugBuscador = 'Educación inclusiva y marco legal';
  codDepartamento: string = '';
  codMunicipio: string = '';

  constructor(
    private appprincipal: AppComponent,
    protected ServicioGeolocalizacion: GeolocalizacionService
  ) {}

  ngOnInit(): void {
    let input: any = document.querySelector('input');
    this.resBuscador = input.value;
    if (localStorage.getItem('codigoDepartamento')) {
      this.codDepartamento = localStorage.getItem('codigoDepartamento')!;
      this.codMunicipio = localStorage.getItem('codigoMunicipio')!;
      this.getMunicipiosPorDepartamento([
        this.codDepartamento,
        this.codMunicipio,
      ]);
    }
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
}
