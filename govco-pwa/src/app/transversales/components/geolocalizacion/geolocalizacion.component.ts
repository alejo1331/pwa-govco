import { Component, OnInit, ViewChild } from '@angular/core';
import { GeolocalizacionService } from '../../services/geolocalizacion/geolocalizacion.service';
import { GeolocalizacionFormularioComponent } from '../geolocalizacion-formulario/geolocalizacion-formulario.component';

@Component({
  selector: 'app-geolocalizacion',
  templateUrl: './geolocalizacion.component.html',
  styleUrls: ['./geolocalizacion.component.css']
})
export class GeolocalizacionComponent implements OnInit {

  @ViewChild(GeolocalizacionFormularioComponent) openFormularioGeolocalizacion: any;

  message: string;
  editMessage: string;

  constructor(protected ApiEntidades: GeolocalizacionService) { }

  ngOnInit(): void {
    this.ApiEntidades.customMessage.subscribe(msg => this.message = msg)
  }  

}
