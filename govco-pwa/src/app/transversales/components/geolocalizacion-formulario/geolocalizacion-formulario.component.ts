import { Component, EventEmitter, HostListener, OnInit, Output, ViewChild } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { ConsultaUbicacionInterface } from '../../models/geolocalizacion/consulta-ubicacion-interface';

import { DepartamentoInterface } from '../../models/geolocalizacion/departamento-interface';
import { MunicipioInterface } from '../../models/geolocalizacion/municipio-interface';
import { GeolocalizacionService } from '../../services/geolocalizacion/geolocalizacion.service';
import { GeolocalizacionComponent } from '../geolocalizacion/geolocalizacion.component';

@Component({
  selector: 'app-geolocalizacion-formulario',
  templateUrl: './geolocalizacion-formulario.component.html',
  styleUrls: ['./geolocalizacion-formulario.component.css']
})
export class GeolocalizacionFormularioComponent implements OnInit {

  listaDepartamentos: DepartamentoInterface[];
  listaMunicipios: MunicipioInterface[];
  consultaUbicacion: ConsultaUbicacionInterface;
  municipio: string

  @Output() closedModal = new EventEmitter<[string, string]>();
  @Output() closedContent = new EventEmitter<string>();

  @ViewChild(GeolocalizacionComponent) ubicacion: string;

  message: string;
  editMessage: string;

  options = {
    enableHighAccuracy: true,
    timeout: 5000,
    maximumAge: 0
  };

  constructor(protected ApiEntidades: GeolocalizacionService) { }

  registerForm = new FormGroup({
    idDepartment: new FormControl('', Validators.required),
    idMunicipality: new FormControl('', Validators.required)
  });

  ngOnInit(): void {
    this.ApiEntidades.getDepartamentos().subscribe((departamentos: DepartamentoInterface[]) => {
      this.listaDepartamentos = departamentos;
    });
    this.ApiEntidades.customMessage.subscribe(msg => this.message = msg);
  }

  getMunicipiosPorDepartamento(CodigoDepartamento: string) {
    this.ApiEntidades.getMunicipiosPorDepartamento(CodigoDepartamento).subscribe((municipios: MunicipioInterface[]) => {
      this.listaMunicipios = municipios;
    });
  }

  closedFormulario() {
    this.closedModal.emit(["translate(100%)", 'translate(0%)']);
  }

  itemSeleccionado(field: string): boolean {
    if (this.registerForm.get(field)?.valid) {
      return true;
    }
    else {
      return false;
    }
  }

  guardarUbicacion(form: any) {
    localStorage.setItem("codigoDepartamento", form.idDepartment);
    localStorage.setItem("codigoMunicipio", form.idMunicipality);
    this.ApiEntidades.getMunicipiosPorDepartamento(form.idDepartment).subscribe((municipios: MunicipioInterface[]) => {
      let a = municipios.filter((element: any) => {
        if (element.codigo == form.idMunicipality) {
          return element.nombre
        }
      });
      this.ApiEntidades.changeMessage("Información para " + a[0].nombre + ".");
    });
    this.closedFormulario();
  }

  @HostListener('window:load')
  onLoad() {
    let estadoPermiso = localStorage.getItem("permisoGeolocalizacion");
    if (estadoPermiso == null) {
      localStorage.setItem("permisoGeolocalizacion", "false")
    }
    if (estadoPermiso == 'false') {
      setTimeout(() => {
        let IngresarUbicacion = confirm("Podrás encontrar trámites, servicios e información según tu ubicación")
        if (IngresarUbicacion == true) {
          this.closedModal.emit(['translate(0%)', 'translate(-100%)']);
          this.datosGeolocalizacion();
        }
      }, 1000);
    }
  }

  datosGeolocalizacion() {

    setTimeout(() => {
      if (navigator.geolocation) {
        navigator.geolocation.getCurrentPosition((ubicaion: any) => {
          localStorage.setItem("permisoGeolocalizacion", "true")
          this.ApiEntidades.getUbicacion(ubicaion.coords.latitude, ubicaion.coords.longitude)
            .subscribe((data: ConsultaUbicacionInterface) => {
              this.listaMunicipios = data.municipios;
              this.registerForm.reset({
                idDepartment: data.codigoDepartamento,
                idMunicipality: data.codigoMunicipio
              });
            });
        }, this.errorGeolocalitation, this.options)
      } else {
        alert("Su navegador no soporta la API de geolocalización.");
      }
    }, 1000);
  }

  errorGeolocalitation(err: any) {
    switch (err.code) {
      case err.PERMISSION_DENIED:
        localStorage.setItem("permisoGeolocalizacion", "false")
        alert('No se ha permitido el acceso a la posición del usuario. '
          + 'Se ha bloqueado el servicio de geolocalización');
        break;
      case err.POSITION_UNAVAILABLE:
        alert("No se ha podido acceder a la información de su posición.");
        break;
      case err.TIMEOUT:
        alert("El servicio ha tardado demasiado tiempo en responder.");
        break;
      default:
        alert("Error desconocido.");
    }
  }

}
