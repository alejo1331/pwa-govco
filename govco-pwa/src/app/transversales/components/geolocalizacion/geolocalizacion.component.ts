import { Component, OnInit, ViewChild } from '@angular/core';
import { MunicipioInterface } from '../../models/geolocalizacion/municipio-interface';
import { GeolocalizacionService } from '../../services/geolocalizacion/geolocalizacion.service';
import { GeolocalizacionFormularioComponent } from '../geolocalizacion-formulario/geolocalizacion-formulario.component';

@Component({
  selector: 'app-geolocalizacion',
  templateUrl: './geolocalizacion.component.html',
  styleUrls: ['./geolocalizacion.component.css']
})
export class GeolocalizacionComponent implements OnInit {

  @ViewChild(GeolocalizacionFormularioComponent) openFormularioGeolocalizacion: any;

  datosUbicacion: [string, string];
  ubicacionMunicipio: string;

  constructor(protected ServicioGeolocalizacion: GeolocalizacionService) { }

  ngOnInit(): void {
    this.ServicioGeolocalizacion.customMessage.subscribe(msg => {
      this.datosUbicacion = msg
      switch (this.datosUbicacion[0]) {
        case 'null':
          this.ubicacionMunicipio = 'Ingresa tu ubicación'
          break;
        case 'TodosLosDepartamentos':
          this.ubicacionMunicipio = 'Información para Toda Colombia';
          break;
        default:
          this.getMunicipiosPorDepartamento(this.datosUbicacion)
          break;
      }
    })
  }

  getMunicipiosPorDepartamento(CodigoDepartMunicipio: [string, string]) {
    this.ServicioGeolocalizacion.getMunicipiosPorDepartamento(CodigoDepartMunicipio[0]).subscribe(
      (municipios: MunicipioInterface[]) => {
        var municipioSeleccionado = municipios.filter((elemento: any)=>{return elemento.codigo === CodigoDepartMunicipio[1]})[0]
        this.ubicacionMunicipio = 'Información para ' + municipioSeleccionado.nombre.toUpperCase();
      })
  }

}
