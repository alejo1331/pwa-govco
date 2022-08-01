import { Component, OnInit, ViewChild } from '@angular/core';
import { MunicipioInterface } from '../../models/geolocalizacion/municipio-interface';
import { GeolocalizacionService } from '../../services/geolocalizacion/geolocalizacion.service';
import { HeaderService } from '../../services/header-service/header.service';
import { GeolocalizacionFormularioComponent } from '../geolocalizacion-formulario/geolocalizacion-formulario.component';

@Component({
  selector: 'app-geolocalizacion',
  templateUrl: './geolocalizacion.component.html',
  styleUrls: ['./geolocalizacion.component.css']
})
export class GeolocalizacionComponent implements OnInit {

  @ViewChild(GeolocalizacionFormularioComponent) openFormularioGeolocalizacion: any;

  ubicacionMunicipio: string;
  ocultar: boolean = false;

  constructor(protected ServicioGeolocalizacion: GeolocalizacionService, protected servicioHeader: HeaderService) { }

  ngOnInit(): void {
    this.servicioHeader.ocultandoHeader.subscribe(estado => {
      this.ocultar = estado[1];
    })

    this.ServicioGeolocalizacion.customMessage.subscribe(([codigoDepartamento, codigoMunicipio] )=> {
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
    })

  }

  getMunicipiosPorDepartamento([codigoDepartamento, codigoMunicipio]: [string, string]) {
    this.ServicioGeolocalizacion.cacheJsonMunicipiosPorDepartamento(codigoDepartamento)
      .then(existe => {
        if (existe) {
          this.ServicioGeolocalizacion.getCacheJsonMunicipiosPorDepartamento(codigoDepartamento)
            .then((municipios: MunicipioInterface[]) => {
              var municipioSeleccionado = municipios.filter((elemento: any) => { return elemento.codigo === codigoMunicipio })[0]
              this.ubicacionMunicipio = 'Información para ' + municipioSeleccionado.nombre.toUpperCase();
            })
        } else {
          this.ServicioGeolocalizacion.getMunicipiosPorDepartamento(codigoDepartamento)
            .subscribe((municipios: MunicipioInterface[]) => {
              var municipioSeleccionado = municipios.filter((elemento: any) => { return elemento.codigo === codigoMunicipio })[0]
              this.ubicacionMunicipio = 'Información para ' + municipioSeleccionado.nombre.toUpperCase();
            });
        }
      })
  }

}
