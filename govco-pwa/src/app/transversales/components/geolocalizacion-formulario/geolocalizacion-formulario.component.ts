import { Component, EventEmitter, HostListener, OnInit, Output } from '@angular/core';
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

  listaDepartamentos: DepartamentoInterface[] = [];
  listaMunicipios: MunicipioInterface[] = [];
  opcionTodosDepartamentos: DepartamentoInterface[] = [];
  opcionTodosMunicipios: MunicipioInterface[] = [];
  estadoPermiso: string | null;
  datosUbicacion: [string, string];
  cerrarModal: [string, string];

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
    this.estadoPermiso = localStorage.getItem("permisoGeolocalizacion")
    if (this.estadoPermiso == null) {
      localStorage.setItem("permisoGeolocalizacion", "false")
    }

    this.cerrarModal = ["translate(100%)", 'translate(0%)'];

    this.opcionTodosMunicipios = [{
      codigo: 'TodosLosMunicipios',
      nombre: 'Todos',
      codigoDepartamento: 'TodosLosDepartamentos',
      departamento: {
        codigo: 'TodosLosDepartamentos',
        nombre: 'Todos'
      }
    }];

    this.opcionTodosDepartamentos = [{
      codigo: 'TodosLosDepartamentos',
      nombre: 'Todos',
      municipios: ["nul"]
    }];

    this.getDepartamentos();
    this.ServicioGeolocalizacion.customMessage.subscribe(msg => this.datosUbicacion = msg);
  }

  getDepartamentos() {
    this.ServicioGeolocalizacion.getDepartamentos().subscribe((departamentos: DepartamentoInterface[]) => {
      this.listaDepartamentos = this.opcionTodosDepartamentos.concat(departamentos);
    });
  }

  getMunicipiosPorDepartamento(CodigoDepartamento: string) {
    this.registerForm.controls['codigoMunicipio'].setValue('')
    if (CodigoDepartamento != 'TodosLosDepartamentos') {
      this.ServicioGeolocalizacion.getMunicipiosPorDepartamento(CodigoDepartamento).subscribe((municipios: MunicipioInterface[]) => {
        this.listaMunicipios = municipios;
      });
    } else {
      this.listaMunicipios = this.opcionTodosMunicipios;
      this.registerForm.controls['codigoMunicipio'].setValue('TodosLosMunicipios')
    }
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

  getGeolocalizacion(MostrarEnBarraGelocalizacion: boolean) {
    setTimeout(() => {
      if (this.ServicioGeolocalizacion.getEstadoServicioGeolocalizacion()) {
        if (navigator.geolocation) {
          navigator.geolocation.getCurrentPosition((ubicaion: any) => {
            this.ServicioGeolocalizacion.getUbicacionActual(ubicaion.coords.latitude, ubicaion.coords.longitude)
              .subscribe((ubicacion: ConsultaUbicacionInterface) => {
                if (MostrarEnBarraGelocalizacion == true) {
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
        break;
    }
  }
}