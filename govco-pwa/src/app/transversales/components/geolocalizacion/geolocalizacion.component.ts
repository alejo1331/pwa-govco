import { Component, OnInit, ViewChild } from '@angular/core';
import { GeolocalizacionFormularioComponent } from '../geolocalizacion-formulario/geolocalizacion-formulario.component';

@Component({
  selector: 'app-geolocalizacion',
  templateUrl: './geolocalizacion.component.html',
  styleUrls: ['./geolocalizacion.component.css']
})
export class GeolocalizacionComponent implements OnInit {

  @ViewChild(GeolocalizacionFormularioComponent) openFormularioGeolocalizacion: any;

  constructor() { }

  ngOnInit(): void {
  
  }  

}
