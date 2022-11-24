import { Component, OnInit } from '@angular/core';
import { BottomMenuService } from 'src/app/transversales/services/bottom-menu/bottom-menu.service';
import { GeolocalizacionService } from 'src/app/transversales/services/geolocalizacion/geolocalizacion.service';
import { HeaderService } from 'src/app/transversales/services/header-service/header.service';
import { SidenavService } from 'src/app/transversales/services/sidenav-service/sidenav-service.service';
import { EspecificoInterface } from '../../models/tramites-mas-consultados/especifico-interface';
import { EstadoInterface } from '../../models/tramites-mas-consultados/estado-interface';
import { GeneralInterface } from '../../models/tramites-mas-consultados/general-interface';
import { PorMunicipioInterface } from '../../models/tramites-mas-consultados/por-municipio-interface';
import { TituloInterface } from '../../models/tramites-mas-consultados/titulo-interface';
import { TramitesMasConsultadosService } from '../../services/tramites-mas-consultados-service/tramites-mas-consultados.service';

@Component({
  selector: 'app-home-principal',
  templateUrl: './home-principal.component.html',
  styleUrls: ['./home-principal.component.css']
})
export class HomePrincipalComponent implements OnInit {

  public dataTramites: EspecificoInterface[];
  dataTramitesMasConsultados: any;
  titulo: string = "";
  icono: string = ''
  codigoMunicipio: string | null = "";
  codigoDepartamento: string | null = "";
  nombreMunicipio: string = "";
  seccion: string = 'LoMasConsultadoHome';

  constructor(
    public bottomService: BottomMenuService,
    protected servicioHeader: HeaderService,
    protected servicioSideNav: SidenavService,
    protected tramitesService: TramitesMasConsultadosService,
    protected ServicioGeolocalizacion: GeolocalizacionService,
  ) {
    this.ServicioGeolocalizacion.coordenadas.subscribe(([codigoDepartamento, codigoMunicipio]) => {
      if (codigoDepartamento != null && codigoMunicipio != null) {
        this.dataGeolocalizacion();
        this.dataFichaTramite();
      }
    })
    this.bottomService.putOcultandoBottomMenu(false);
  }

  ngOnInit(): void {
    // servicioHeader.estadoHeader(a, b)       a -> true = header seccion internas
    //                                         a -> false = header general
    //                                         b -> Muestra/Oculta  Header
    //bottomService.seleccionandoItem(0)       0 -> Activa boton incio del menu inferior
    //                                         1, 2, 3 -> Tramites, Ingresa
    //servicioSideNav.seleccionandoItem(a, b)  a -> Activa o inactiva menu lateral
    //                                         b -> String con el valor del item a seleccionar
    //bottomService.ajustandoPantalla(true)    true -> Agrega clase de css para ajustar 
    //                                                 la pantalla cuando en la seccion  
    //                                                 consultada no tiene header
    this.servicioHeader.estadoHeader(false, true);
    this.bottomService.seleccionandoItem(0);
    this.bottomService.ajustandoPantalla(false);
    this.servicioSideNav.seleccionandoItem(false, 'null');
    (document.getElementById('topScroll') as HTMLElement).style.top = '7.25rem';
    (document.getElementById('topScroll') as HTMLElement).scrollTop = 0;

    this.dataGeolocalizacion();
    this.dataFichaTramite();
  }

  dataGeolocalizacion() {
    this.codigoDepartamento = localStorage.getItem("codigoDepartamento") != null ? localStorage.getItem("codigoDepartamento") : '';
    this.codigoMunicipio = localStorage.getItem("codigoMunicipio") != null ? localStorage.getItem("codigoMunicipio") : '';

    if (this.codigoMunicipio != '') {
      this.getMunicipiosPorDepartamento([String(this.codigoDepartamento), String(this.codigoMunicipio)])
    }

  }

  getMunicipiosPorDepartamento([codigoDepartamento, codigoMunicipio]: [string, string]) {
    if (codigoDepartamento == 'TodosLosDepartamentos') {
      this.nombreMunicipio = 'Toda Colombia';
    }

    if (codigoDepartamento != null) {
      codigoDepartamento = codigoDepartamento != 'TodosLosDepartamentos' ? codigoDepartamento : '';
    } else {
      codigoDepartamento = '';
    }

    if (codigoMunicipio != null) {
      codigoMunicipio = codigoMunicipio != 'TodosLosMunicipios' ? codigoMunicipio : '';
    } else {
      codigoMunicipio = '';
    }

    if (codigoMunicipio != '') {
      this.ServicioGeolocalizacion.getCacheJsonMunicipiosPorDepartamento(codigoDepartamento)
        .then((municipios: any) => {
          municipios.forEach((data: any) => {
            if (data['codigo'] == codigoMunicipio) {
              this.nombreMunicipio = data['nombre'];
            }
          });
        })
    }
  }

  dataFichaTramite() {
    this.tramitesService.getTramitesMasConsultadosEstado().subscribe((estado: EstadoInterface) => {
      if (estado.data.activo == 1) {

        this.tramitesService.getTramitesMasConsultadosTitulo(this.seccion).subscribe((dataTitulo: TituloInterface) => {
          this.titulo = dataTitulo.data.titulo;
        })
        this.codigoMunicipio == "" || this.codigoMunicipio == "TodosLosMunicipios" ?
          this.tramitesService.getTramitesMasConsultados().subscribe((info: GeneralInterface) => {
            this.dataTramites = info.data;
            this.inputTramitesMasConsultados();
          })
          : this.tramitesService.getTramitesMasConsultadosPorMunicipio(this.codigoMunicipio).subscribe((tramitesPorMunicipio: PorMunicipioInterface) => {
            this.dataTramites = tramitesPorMunicipio.data;
            this.inputTramitesMasConsultados();
          });
      }
    })
  }

  inputTramitesMasConsultados() {
    this.dataTramitesMasConsultados = {
      dataTitulo: this.titulo,
      dataTramites: this.dataTramites,
      ubicacion: this.nombreMunicipio,
      codigoMunicipio: this.codigoMunicipio
    }
  }

}
