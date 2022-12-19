import { Component, ElementRef, Input, OnInit, ViewChild } from '@angular/core';
import { BottomMenuService } from 'src/app/transversales/services/bottom-menu/bottom-menu.service';
import { HeaderService } from 'src/app/transversales/services/header-service/header.service';
import { SidenavService } from 'src/app/transversales/services/sidenav-service/sidenav-service.service';
import { TramitesPorIdService } from '../../services/tramites-por-id-service/tramites-por-id.service';
import { TipoEnlace, TipoAudiencia, InformacionFicha } from '../../models/tramites-id-models/tramites-por-id-interface';
import { DataBasicaPuntosInterface } from '../../models/puntos-de-atencion/data-basica-puntos-interface';
import { AppService } from 'src/app/app.service';

@Component({
  selector: 'app-tramites-id',
  templateUrl: './tramites-id.component.html',
  styleUrls: ['./tramites-id.component.css'],
})
export class TramitesIdComponent implements OnInit {
  @ViewChild('seccionTramitesId') seccionTramitesId: ElementRef;
  @ViewChild('seccionPuntoAtencion') seccionPuntoAtencion: ElementRef;
  @Input() informacionFicha: InformacionFicha;

  botonAtras: { url: string, tipoNavegacion: string };
  dataPuntosAtencion: DataBasicaPuntosInterface
  topScroll: HTMLElement;
  estructuraModalDesplegable: { titulo: string; icono: string }[];
  perfil_idTramite: { perfil: string; idTramite: number };
  infoBasicaTramite: TipoEnlace;
  nombreTramite: string;
  idTramite: number;
  audiencias: TipoAudiencia[];
  embebido: boolean = false;
  activarPuntosAtecion: boolean = false;
  activarTramitesId: boolean = false;
  urlPage: string;
  previousUrl: any;


  constructor(
    protected fichaTramiteService: TramitesPorIdService,
    protected servicioSideNav: SidenavService,
    protected servicioHeader: HeaderService,
    public bottomService: BottomMenuService,
    public appService: AppService,

  ) {
    this.fichaTramiteService.abrirPuntosAtencion.subscribe(
      (data: DataBasicaPuntosInterface) => this.abrirPuntosAtencion(data)
    );
    this.previousUrl = appService.previousUrl;
  }

  ngOnInit(): void {
    this.botonAtras = {
      url: this.previousUrl,
      tipoNavegacion: 'router'
    };

    this.estructuraModalDesplegable = [
      {
        titulo: 'Ciudadano',
        icono:
          '../../../../assets/icons-fonts/account_circle_FILL1_wght500_GRAD0_opsz20.svg',
      },
      {
        titulo: 'Extranjero',
        icono:
          '../../../../assets/icons-fonts/badge_FILL0_wght500_GRAD0_opsz20.svg',
      },
      {
        titulo: 'Empresa privada',
        icono:
          '../../../../assets/icons-fonts/apartment_FILL0_wght500_GRAD0_opsz20.svg',
      },
      {
        titulo: 'Entidad pública',
        icono:
          '../../../../assets/icons-fonts/account_balance_FILL0_wght500_GRAD0_opsz20.svg',
      },
    ];

    this.servicioHeader.estadoHeader(false, false);
    this.bottomService.putOcultandoBottomMenu(true);
    this.servicioSideNav.seleccionandoItem(false, 'null');
    this.bottomService.ajustandoPantalla(true);
    this.topScroll = document.getElementById('topScroll') as HTMLElement;
    this.topScroll.scrollTop = 0;
    this.topScroll.style.top = '0';

    this.cargarInformacionFicha(this.informacionFicha);
    this.urlPage = window.location.href;
  }

  private async cargarInformacionFicha(dataTramite: InformacionFicha) {

    this.fichaTramiteService
      .GetTipoTramiteFichaEspecificaById(String(dataTramite.id))
      .subscribe(
        (dataFicha: TipoEnlace) => {
          // to do
          // dataTramite ? this.GenerarTrackingTramite(dataTramite.id) : null;
          this.infoBasicaTramite = dataFicha;
          this.nombreTramite = this.infoBasicaTramite.NombreEstandarizado;
          this.fichaTramiteService.setTipoAtencionPresencial(
            this.infoBasicaTramite.TipoAtencionPresencial
          );
          this.fichaTramiteService
            .GetTiposAudienciaById(String(dataTramite.id))
            .subscribe(
              (audiencia: TipoAudiencia[]) => {
                this.audiencias = audiencia;
              },
              (error) => {
                console.log('error', error);
              }
            );
          this.idTramite = Number(this.infoBasicaTramite.IdTramite);
          // Obtiene la URL de trámite en linea
          this.fichaTramiteService.GetBarraProcesoTramite(String(dataTramite.id)).subscribe((res) => {
            if (res.urlTramite != undefined) {
              this.infoBasicaTramite.UrlTramiteEnLinea = res.urlTramite;
              this.infoBasicaTramite.EnLinea = res.isEnlinea;
            }
          },
            (error) => {
              console.log('error', error);
              (this.activarTramitesId = true);
            }, () => {
              this.activarTramitesId = true;
            }
          );
        }
      );
  }

  //este servicio no esta funcionando
  private async GenerarTrackingTramite(id: number) {
    this.fichaTramiteService.GenerarTrackingTramite(String(id)).subscribe(
      (resp: any) => {
        console.log(resp);
      },
      (error) => {
        console.error(error);
      }
    );
  }

  perfilSeleccionado(perfil: string) {
    this.perfil_idTramite = {
      perfil: perfil,
      idTramite: this.informacionFicha.id,
    };
  }

  abrirPuntosAtencion(data: DataBasicaPuntosInterface) {
    this.activarPuntosAtecion = data.activar;
    if (this.activarPuntosAtecion) {
      this.dataPuntosAtencion = data;
      this.seccionTramitesId.nativeElement.style.left = data.transitionTramitesId;
      this.seccionPuntoAtencion.nativeElement.style.left = data.transitionPuntosAtencion;
    }
  }

  cerrarPuntosAtencion([cerrarPuntosAtencion, abrirTramitesId]: [string, string]) {
    this.seccionTramitesId.nativeElement.style.left = abrirTramitesId;
    this.seccionPuntoAtencion.nativeElement.style.left = cerrarPuntosAtencion;
    this.seccionTramitesId.nativeElement.addEventListener(
      'transitionend',
      () => {
        if (this.seccionTramitesId.nativeElement.style.left == '0%') {
          this.activarPuntosAtecion = false;
        }
      }
    );
  }

  iteracionBotonRetroalimentaciona(estado: string) {
    let botonRetroalimentacion: HTMLElement = (
      document.querySelector('app-boton-retroalimentacion .button-container') as HTMLElement
    );
    if (estado == 'ocultar') {
      botonRetroalimentacion.style.opacity = '0';
    } else {
      botonRetroalimentacion.style.opacity = '1';
      botonRetroalimentacion.style.zIndex = '7';
    }
    botonRetroalimentacion.addEventListener('transitionend', () => {
      if (estado == 'mostrar') {
        botonRetroalimentacion.style.zIndex = '7';
      } else {
        botonRetroalimentacion.style.zIndex = '-1';
      }
    });
  }
}
