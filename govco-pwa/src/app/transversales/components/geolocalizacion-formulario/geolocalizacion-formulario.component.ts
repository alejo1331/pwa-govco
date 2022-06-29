import { Component, EventEmitter, OnInit, Output, ViewChild } from '@angular/core';
import { DepartamentoInterface } from '../../models/geolocalizacion/departamento-interface';
import { MunicipioInterface } from '../../models/geolocalizacion/municipio-interface';
import { GeolocalizacionService } from '../../services/geolocalizacion/geolocalizacion.service';

@Component({
  selector: 'app-geolocalizacion-formulario',
  templateUrl: './geolocalizacion-formulario.component.html',
  styleUrls: ['./geolocalizacion-formulario.component.css']
})
export class GeolocalizacionFormularioComponent implements OnInit {

  listaDepartamentos: DepartamentoInterface[];
  listaMunicipios: MunicipioInterface[];

  @Output() closedModal = new EventEmitter<string>();

  constructor(protected ApiEntidades: GeolocalizacionService) { }

  ngOnInit(): void {
    this.ApiEntidades.getDepartamentos().subscribe((departamentos: DepartamentoInterface[])=>{
      this.listaDepartamentos = departamentos;
    });
  }

  getMunicipiosPorDepartamento(CodigoDepartamento: string){
    this.ApiEntidades.getMunicipiosPorDepartamento(CodigoDepartamento).subscribe((municipios: MunicipioInterface[])=>{
      this.listaMunicipios = municipios;
    });
  }

  closedFormulario(){
    this.closedModal.emit("none");
  }

}
