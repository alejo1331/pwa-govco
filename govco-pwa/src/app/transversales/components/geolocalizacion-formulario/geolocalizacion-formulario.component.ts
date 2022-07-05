import { Component, EventEmitter, HostListener, OnInit, Output, ViewChild } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';

import { ConsultaUbicacionInterface } from '../../models/geolocalizacion/consulta-ubicacion-interface';
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
  estadoPermiso: string | null = localStorage.getItem("permisoGeolocalizacion");
  datosUbicacion: [string, string];
  cerrarModal: [string, string] = ["translate(100%)", 'translate(0%)'];

  @Output() closedModal = new EventEmitter<[string, string]>();
  @Output() closedContent = new EventEmitter<string>();

  options = {
    enableHighAccuracy: true,
    timeout: 5000,
    maximumAge: 0
  };

  registerForm = new FormGroup({
    codigoDepartamento: new FormControl('', Validators.required),
    codigoMunicipio: new FormControl('', Validators.required)
  });

  constructor(protected ServicioGeolocalizacion: GeolocalizacionService) {
  }

  ngOnInit(): void {
    if(this.estadoPermiso == null){
      localStorage.setItem("permisoGeolocalizacion", "false")
    }
    this.ServicioGeolocalizacion.getDepartamentos().subscribe((departamentos: DepartamentoInterface[]) => {
      this.listaDepartamentos = departamentos;
    });
    this.ServicioGeolocalizacion.customMessage.subscribe(msg => this.datosUbicacion = msg);
  }

  getMunicipiosPorDepartamento(CodigoDepartamento: string) {
    this.registerForm.controls['codigoMunicipio'].setValue('')
    this.ServicioGeolocalizacion.getMunicipiosPorDepartamento(CodigoDepartamento).subscribe((municipios: MunicipioInterface[]) => {
      this.listaMunicipios = municipios;
    });
  }

  itemSeleccionado(field: string): boolean {
    if (this.registerForm.get(field)?.valid) {
      return true;
    }
    else {
      return false;
    }
  }

  closedFormulario() {
    this.closedModal.emit(this.cerrarModal);
  }

  guardarUbicacion(form: any) {
    localStorage.setItem("codigoDepartamento", form.codigoDepartamento);
    localStorage.setItem("codigoMunicipio", form.codigoMunicipio);
    this.ServicioGeolocalizacion.changeMessage(form.codigoDepartamento, form.codigoMunicipio);
    this.closedFormulario();
  }

  @HostListener('window:load')
  onLoad() {
    console.log(this.estadoPermiso)
    if (this.estadoPermiso == 'true') {
      this.getGeolocalizacion(true);
    } else {
      setTimeout(() => {
        let IngresarUbicacion = confirm("Podrás encontrar trámites, servicios e información según tu ubicación")
        if (IngresarUbicacion == true) {
          this.closedModal.emit(['translate(0%)', 'translate(-100%)']);
          this.getGeolocalizacion(false);
        }
      }, 1000);
    }
  }

  getGeolocalizacion(barraGelocalizacion: boolean) {
    setTimeout(() => {
      if (navigator.geolocation) {
        navigator.geolocation.getCurrentPosition((ubicaion: any) => {
          console.log(ubicaion.coords.latitude, ubicaion.coords.longitude)
          this.ServicioGeolocalizacion.getUbicacion(ubicaion.coords.latitude, ubicaion.coords.longitude)
            .subscribe((ubicacion: ConsultaUbicacionInterface) => {
              if (barraGelocalizacion == true) {
                this.ServicioGeolocalizacion.changeMessage(ubicacion.codigoDepartamento, ubicacion.codigoMunicipio);
              }
              localStorage.setItem("permisoGeolocalizacion", "true")
              localStorage.setItem("codigoDepartamento", ubicacion.codigoDepartamento);
              localStorage.setItem("codigoMunicipio", ubicacion.codigoMunicipio);
              this.listaMunicipios = ubicacion.municipios;
              this.registerForm.reset({
                codigoDepartamento: ubicacion.codigoDepartamento,
                codigoMunicipio: ubicacion.codigoMunicipio
              });
            }, this.errorServicioGeolocalizacion);
        }, this.errorGeolocalitation, this.options)
      } else {
        alert("Su navegador no soporta la API de geolocalización");
      }
    }, 1000);
  }

  errorServicioGeolocalizacion(err: any) {
    alert("El servicio ha tardado demasiado tiempo en responder.")
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