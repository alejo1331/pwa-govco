import { AfterViewInit, Component, ElementRef, EventEmitter, HostListener, OnInit, Output, ViewChild } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';

import { ConsultaUbicacionInterface } from '../../models/geolocalizacion/consulta-ubicacion-interface';
import { DepartamentoInterface } from '../../models/geolocalizacion/departamento-interface';
import { MunicipioInterface } from '../../models/geolocalizacion/municipio-interface';
import { GeolocalizacionService } from '../../services/geolocalizacion/geolocalizacion.service';
import { MatDialog } from '@angular/material/dialog';
import { CacheStorageService } from '../../services/cache-storage-service/cache-storage.service';
import { ModalService } from 'src/app/modal-natvivo/services/modal.service';
import { ModalInterface } from 'src/app/modal-natvivo/models/modal-interface';
import { ModalClasicoComponent } from 'src/app/modal-natvivo/components/modal-clasico/modal-clasico.component';
import { SwUpdate } from '@angular/service-worker';
import { BarraSuperiorComponent } from '../barra-superior/barra-superior.component';

@Component({
  selector: 'app-geolocalizacion-formulario',
  templateUrl: './geolocalizacion-formulario.component.html',
  styleUrls: ['./geolocalizacion-formulario.component.css']
})
export class GeolocalizacionFormularioComponent implements OnInit, AfterViewInit {

  listaDepartamentos: DepartamentoInterface[] = [];
  listaMunicipios: MunicipioInterface[] = [];
  opcionTodosDepartamentos: DepartamentoInterface[] = [];
  opcionTodosMunicipios: MunicipioInterface[] = [];
  datosUbicacion: [string, string]
  cerrarModal: [string, string];
  departLocalStorage: string;
  municiLocalStorage: string;
  reiniciarFocus: boolean = false;

  modalClasico: ModalInterface;

  @Output() closedModal = new EventEmitter<[string, string]>();
  @Output() closedContent = new EventEmitter<string>();
  @ViewChild('botonAtras') botonAtras: ElementRef;
  @ViewChild('botonGuardar') botonGuardar: ElementRef;

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
    protected ServicioCache: CacheStorageService,
    public dialog: MatDialog,
    protected modalService: ModalService,
    private swUpdate: SwUpdate,
  ) {
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
      municipios: ["null"]
    }];

    this.getDepartamentos();

    this.ServicioGeolocalizacion.getUbicacion.subscribe(msg => this.datosUbicacion = msg);
  }

  ngAfterViewInit(): void {
    const modalVisto = sessionStorage.getItem('modalVisto');

    if (modalVisto != 'true') {
      //inicio - contruccion modal natico clasico
      this.modalClasico = {
        campoTitulo: "Ingresa tu ubicación",
        campoTexto: "Podrás encontrar trámites, servicios e información según tu ubicación",
        botonCancelar: "CANCELAR",
        botonAceptar: "INGRESAR"
      };
      this.modalService.clasico(this.modalClasico);
      //fin - contruccion modal natico clasico
      setTimeout(() => {
        let IngresarUbicacion = this.dialog.open(ModalClasicoComponent, {
          width: '280px'
        });
        IngresarUbicacion.afterClosed().subscribe(resultado => {
          sessionStorage.setItem('modalVisto', 'true');
          if (resultado === false) {
            var menuHamburguesa = (document.getElementsByClassName('menu-hamburgesa-pwa-govco') as HTMLCollectionOf<HTMLElement>)[0];
            menuHamburguesa.focus();
          }
          this.updatePWA();
          if (resultado) {
            this.getGeolocalizacion();
            this.closedModal.emit(['translate(0%)', 'translate(-100%)']);
          }
        });
      }, 1000);
    } else {
      this.updatePWA();
    }
  }

  updatePWA() {
    //inicio - contruccion modal natico clasico
    this.modalClasico = {
      campoTitulo: 'Actualización',
      campoTexto: 'Nueva versión de GOV.CO disponible.',
      botonCancelar: 'CANCELAR',
      botonAceptar: 'ACTUALIZAR',
    };
    this.modalService.clasico(this.modalClasico);
    //fin - contruccion modal natico clasico

    const modalVisto = sessionStorage.getItem('modalVisto');

    if (modalVisto == 'true') {
      if (this.swUpdate.isEnabled) {
        this.swUpdate.available.subscribe(() => {
          let respuestaModalClasico = this.dialog.open(ModalClasicoComponent, {
            width: '280px',
          });
          respuestaModalClasico.afterClosed().subscribe((resultado) => {
            if (resultado === true) {
              this.swUpdate
                .activateUpdate()
                .then(() => window.location.reload());
            }
          });
        });
      }
    }
  }

  getDepartamentos() {
    this.ServicioGeolocalizacion.cacheJsonDepartamentos().then(existe => {
      switch (existe) {
        case true:
          this.ServicioGeolocalizacion.getCacheJsonDepartamentos().then((departamentos: DepartamentoInterface[]) => {
            setTimeout(() => {
              this.listaDepartamentos = this.opcionTodosDepartamentos.concat(departamentos);
            }, 100);
          })
          break;
        case false:
          this.ServicioGeolocalizacion.getDepartamentos().subscribe((departamentos: DepartamentoInterface[]) => {
            setTimeout(() => {
              this.listaDepartamentos = this.opcionTodosDepartamentos.concat(departamentos);
            }, 100);
          })
          break;
      }
    });
  }

  async getMunicipiosPorDepartamento(codigoDepartamento: string) {
    this.registerForm.reset({
      codigoDepartamento: codigoDepartamento,
      codigoMunicipio: ''
    });
    if (codigoDepartamento != 'TodosLosDepartamentos') {
      this.ServicioGeolocalizacion.cacheJsonMunicipiosPorDepartamento(codigoDepartamento)
        .then(existe => {
          if (existe) {
            this.ServicioGeolocalizacion.getCacheJsonMunicipiosPorDepartamento(codigoDepartamento)
              .then((municipios: MunicipioInterface[]) => {
                setTimeout(() => {
                  this.listaMunicipios = municipios;
                }, 100);
              })
          } else {
            this.ServicioGeolocalizacion.getMunicipiosPorDepartamento(codigoDepartamento)
              .subscribe((
                municipios: MunicipioInterface[]) => {
                setTimeout(() => {
                  this.listaMunicipios = municipios;
                }, 100);
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
      this.registerForm.controls['codigoMunicipio'].setValue('TodosLosMunicipios');
    }
  }

  abrirFormulario() {
    const departamento = localStorage.getItem("codigoDepartamento");
    const municipio = localStorage.getItem("codigoMunicipio");
    this.departLocalStorage = String(departamento)
    this.municiLocalStorage = String(municipio)

    if (departamento && municipio) {
      this.resetFormulario(departamento, municipio);
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
    if (codigoDepartamento != 'null') {
      this.resetFormulario(codigoDepartamento, codigoMunicipio);
    }
  }

  guardarUbicacion(form: any) {
    localStorage.setItem("codigoDepartamento", form.codigoDepartamento);
    localStorage.setItem("codigoMunicipio", form.codigoMunicipio);
    this.ServicioGeolocalizacion.setUbicacion(form.codigoDepartamento, form.codigoMunicipio);
    this.closedFormulario();
  }

  focus() {
    this.botonAtras.nativeElement.focus();
    this.reiniciarFocus = false;
  }

  @HostListener('window:keyup', ['$event']) onTab(event: KeyboardEvent) {
    if (this.reiniciarFocus) {
      this.focus();
    }

    if (this.botonGuardar.nativeElement == event.target) {
      this.reiniciarFocus = true;
    }
  }

  resetFormulario(codigoDepartamento: string, codigoMunicipio: string) {
    if (codigoDepartamento == 'TodosLosDepartamentos') {
      this.ServicioGeolocalizacion.getCacheJsonDepartamentos().then((departamentos: DepartamentoInterface[]) => {
        setTimeout(() => {
          this.listaDepartamentos = this.opcionTodosDepartamentos.concat(departamentos);
          this.listaMunicipios = this.opcionTodosMunicipios;
          this.registerForm.controls['codigoDepartamento'].setValue('TodosLosDepartamentos');
          this.registerForm.controls['codigoMunicipio'].setValue('TodosLosMunicipios');
        }, 100);
      })

    } else {
      this.ServicioGeolocalizacion.getCacheJsonMunicipiosPorDepartamento(codigoDepartamento)
        .then((municipios: MunicipioInterface[]) => {
          this.listaMunicipios = municipios;
          setTimeout(() => {
            this.registerForm.reset({
              codigoDepartamento: codigoDepartamento,
              codigoMunicipio: codigoMunicipio
            });
          }, 300);

        })
    }
  }

  getGeolocalizacion() {
    setTimeout(() => {
      if (this.ServicioGeolocalizacion.getEstadoServicioGeolocalizacion()) {
        if (navigator.geolocation) {
          navigator.geolocation.getCurrentPosition((data: any) => {
            this.ServicioGeolocalizacion.getUbicacionActual(data.coords.latitude, data.coords.longitude)
              .subscribe((ubicacion: ConsultaUbicacionInterface) => {
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