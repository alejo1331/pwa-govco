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
  ubicacionMunicipio: string = 'Ingresa tu ubicación';

  constructor(protected ServicioGeolocalizacion: GeolocalizacionService) { }

  ngOnInit(): void {
    this.ServicioGeolocalizacion.customMessage.subscribe(msg => {
      this.datosUbicacion = msg
      if (this.datosUbicacion != ['null', 'null']) {
        this.ServicioGeolocalizacion.getMunicipiosPorDepartamento(this.datosUbicacion[0]).subscribe(
          (municipios: MunicipioInterface[]) => {
            municipios.filter((elemento: any) => {
              if (elemento.codigo == this.datosUbicacion[1]) {
                this.ubicacionMunicipio = 'Información para ' + elemento.nombre;
              }
            })
          })
      }
    })
  }

}
