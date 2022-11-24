import { AfterViewInit, Component, ElementRef, EventEmitter, OnInit, Output, ViewChild } from '@angular/core';
import { ModalInterface } from 'src/app/modal-natvivo/models/modal-interface';
import { MunicipioInterface } from '../../models/geolocalizacion/municipio-interface';
import { GeolocalizacionService } from '../../services/geolocalizacion/geolocalizacion.service';
import { HeaderService } from '../../services/header-service/header.service';

@Component({
  selector: 'app-geolocalizacion',
  templateUrl: './geolocalizacion.component.html',
  styleUrls: ['./geolocalizacion.component.css']
})
export class GeolocalizacionComponent implements OnInit, AfterViewInit {

  // ElementRef para el focus
  @ViewChild('contenidoHtml') contenidoHtml: ElementRef;
  @ViewChild('boton') boton: ElementRef;
  modalClasico: ModalInterface;

  @Output() abrir = new EventEmitter<string[]>();

  ubicacionMunicipio: string;
  ocultar: boolean = false;

  constructor(
    protected ServicioGeolocalizacion: GeolocalizacionService,
    protected servicioHeader: HeaderService,
  ) { }

  ngOnInit(): void {
    this.servicioHeader.ocultandoHeader.subscribe(estado => {
      this.ocultar = estado[1];
    })

    this.ServicioGeolocalizacion.getUbicacion.subscribe(([codigoDepartamento, codigoMunicipio]) => {
      switch (codigoDepartamento) {
        case 'null':
          this.ubicacionMunicipio = 'Ingresa tu ubicación'
          break;
        case 'TodosLosDepartamentos':
          this.ubicacionMunicipio = 'Información para Toda Colombia';
          break;
        default:
          this.getMunicipiosPorDepartamento([codigoDepartamento, codigoMunicipio])
          break;
      }
    })

  }

  ngAfterViewInit(): void {
    const departamento = localStorage.getItem("codigoDepartamento");
    const municipio = localStorage.getItem("codigoMunicipio");

    if (departamento && municipio) {
      this.ServicioGeolocalizacion.setUbicacion(departamento, municipio);
    }
  }

  getMunicipiosPorDepartamento([codigoDepartamento, codigoMunicipio]: [string, string]) {
    this.ServicioGeolocalizacion.cacheJsonMunicipiosPorDepartamento(codigoDepartamento)
      .then(existe => {
        if (existe) {
          this.ServicioGeolocalizacion.getCacheJsonMunicipiosPorDepartamento(codigoDepartamento)
            .then((municipios: MunicipioInterface[]) => {
              var municipioSeleccionado = municipios.filter((elemento: any) => { return elemento.codigo === codigoMunicipio })[0]
              this.ubicacionMunicipio = 'Información para ' + municipioSeleccionado.nombre.toUpperCase();
            })
        } else {
          this.ServicioGeolocalizacion.getMunicipiosPorDepartamento(codigoDepartamento)
            .subscribe((municipios: MunicipioInterface[]) => {
              var municipioSeleccionado = municipios.filter((elemento: any) => { return elemento.codigo === codigoMunicipio })[0]
              this.ubicacionMunicipio = 'Información para ' + municipioSeleccionado.nombre.toUpperCase();
            });
        }
      })
  }

  abrirFormularioGeo() {
    this.abrir.emit(['translate(0%)', 'translate(-100%)']);
  }

}
