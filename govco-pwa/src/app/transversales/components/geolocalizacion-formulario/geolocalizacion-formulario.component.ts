import { Component, EventEmitter, HostListener, OnInit, Output, Inject } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';

import { ConsultaUbicacionInterface } from '../../models/geolocalizacion/consulta-ubicacion-interface';
import { DepartamentoInterface } from '../../models/geolocalizacion/departamento-interface';
import { MunicipioInterface } from '../../models/geolocalizacion/municipio-interface';
import { GeolocalizacionService } from '../../services/geolocalizacion/geolocalizacion.service';
import { MatDialog } from '@angular/material/dialog';
import { ConfirmacionUbicacionComponent } from './components/confirmacion-ubicacion/confirmacion-ubicacion.component';

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
  datosUbicacion: [string, string]
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

  constructor(
    protected ServicioGeolocalizacion: GeolocalizacionService,
    public dialog: MatDialog) {
  }

  ngOnInit(): void {
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

    this.ServicioGeolocalizacion.coordenadas.subscribe(msg => this.datosUbicacion = msg);
  }

  resetForm(codigoDepartamento: string, codigoMunicipio: string) {
    console.log('resetForm', codigoDepartamento, codigoMunicipio)
  }

  getDepartamentos() {
    this.ServicioGeolocalizacion.cacheJsonDepartamentos().then(existe => {
      switch (existe) {
        case true:
          this.ServicioGeolocalizacion.getCacheJsonDepartamentos().then((departamentos: DepartamentoInterface[]) => {
            this.listaDepartamentos = this.opcionTodosDepartamentos.concat(departamentos);
          })
          break;
        case false:
          this.ServicioGeolocalizacion.getDepartamentos().subscribe((departamentos: DepartamentoInterface[]) => {
            this.listaDepartamentos = this.opcionTodosDepartamentos.concat(departamentos);
          })
          break;
      }
    });
  }

  getMunicipiosPorDepartamento(codigoDepartamento: string) {
    this.registerForm.controls['codigoMunicipio'].setValue('')
    if (codigoDepartamento != 'TodosLosDepartamentos') {
      this.ServicioGeolocalizacion.cacheJsonMunicipiosPorDepartamento(codigoDepartamento)
        .then(existe => {
          if (existe) {
            this.ServicioGeolocalizacion.getCacheJsonMunicipiosPorDepartamento(codigoDepartamento)
              .then((municipios: MunicipioInterface[]) => {
                this.listaMunicipios = municipios;
              })
          } else {
            this.ServicioGeolocalizacion.getMunicipiosPorDepartamento(codigoDepartamento)
              .subscribe((
                municipios: MunicipioInterface[]) => {
                this.listaMunicipios = municipios;
              },
                error => {
                  this.listaMunicipios = [{
                    codigo: '',
                    nombre: 'null',
                    codigoDepartamento: codigoDepartamento,
                    departamento: {
                      codigo: codigoDepartamento,
                      nombre: ''
                    }
                  }];
                }
              );
          }
        })
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
    const codigoDepartamento = String(localStorage.getItem("codigoDepartamento"));
    const codigoMunicipio = String(localStorage.getItem("codigoMunicipio"));
    this.getMunicipiosPorDepartamento(codigoDepartamento)
    this.registerForm.reset({
      codigoDepartamento: codigoDepartamento,
      codigoMunicipio: codigoMunicipio
    });
  }

  guardarUbicacion(form: any) {
    localStorage.setItem("codigoDepartamento", form.codigoDepartamento);
    localStorage.setItem("codigoMunicipio", form.codigoMunicipio);
    this.ServicioGeolocalizacion.ubicacion(form.codigoDepartamento, form.codigoMunicipio);
    this.closedFormulario();
  }

  @HostListener('window:load')
  onLoad() {
    const modalVisto = sessionStorage.getItem('modalVisto');
    const dep = localStorage.getItem("codigoDepartamento");
    const mun = localStorage.getItem("codigoMunicipio");

    if (dep && mun) {
      this.ServicioGeolocalizacion.ubicacion(dep, mun);
      this.resetFormulario(dep, mun);
    }

    if (modalVisto != 'true') {
      setTimeout(() => {
        let IngresarUbicacion = this.dialog.open(ConfirmacionUbicacionComponent, {
          width: '280px'
        });
        IngresarUbicacion.afterClosed().subscribe(resultado => {
          sessionStorage.setItem('modalVisto', 'true');
          if (resultado) {
            this.getGeolocalizacion(false); 
            this.closedModal.emit(['translate(0%)', 'translate(-100%)']);
          }
        });
      }, 1000);
    } 
  }

  resetFormulario(codigoDepartamento: string, codigoMunicipio: string) {
    this.ServicioGeolocalizacion.cacheJsonMunicipiosPorDepartamento(codigoDepartamento)
      .then(existe => {
        if (existe) {
          this.ServicioGeolocalizacion.getCacheJsonMunicipiosPorDepartamento(codigoDepartamento)
            .then((municipios: MunicipioInterface[]) => {
              this.listaMunicipios = municipios;
              this.registerForm.reset({
                codigoDepartamento: codigoDepartamento,
                codigoMunicipio: codigoMunicipio
              });
            })
        } else {
          this.ServicioGeolocalizacion.getMunicipiosPorDepartamento(codigoDepartamento)
            .subscribe((municipios: MunicipioInterface[]) => {
              this.listaMunicipios = municipios;
              this.registerForm.reset({
                codigoDepartamento: codigoDepartamento,
                codigoMunicipio: codigoMunicipio
              });
            },
              error => {
                this.listaMunicipios = [{
                  codigo: '',
                  nombre: 'null',
                  codigoDepartamento: codigoDepartamento,
                  departamento: {
                    codigo: codigoDepartamento,
                    nombre: ''
                  }
                }];
              });
        }
      })
  }

  getGeolocalizacion(MostrarEnBarraGelocalizacion: boolean) {
    setTimeout(() => {
      if (this.ServicioGeolocalizacion.getEstadoServicioGeolocalizacion()) {
        if (navigator.geolocation) {
          navigator.geolocation.getCurrentPosition((data: any) => {
            this.ServicioGeolocalizacion.getUbicacionActual(data.coords.latitude, data.coords.longitude)
              .subscribe((ubicacion: ConsultaUbicacionInterface) => {
                if (MostrarEnBarraGelocalizacion == true) {
                  this.ServicioGeolocalizacion.ubicacion(ubicacion.codigoDepartamento, ubicacion.codigoMunicipio);
                }
                localStorage.setItem("permisoGeolocalizacion", "permitido")
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
        localStorage.setItem("permisoGeolocalizacion", "bloqueado")
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
