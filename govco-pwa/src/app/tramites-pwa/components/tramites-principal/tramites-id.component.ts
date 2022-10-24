import { Component, ElementRef, Input, OnInit, ViewChild } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { BottomMenuService } from 'src/app/transversales/services/bottom-menu/bottom-menu.service';
import { HeaderService } from 'src/app/transversales/services/header-service/header.service';
import { SidenavService } from 'src/app/transversales/services/sidenav-service/sidenav-service.service';
import { TramitesPorIdService } from '../../services/tramites-por-id-service/tramites-por-id.service';
import { TipoEnlace, TipoAudiencia, informacionFicha } from '../../models/tramites-id-models/tramites-por-id-interface';
import { DataBasicaPuntosInterface } from '../../models/puntos-de-atencion/data-basica-puntos-interface';

@Component({
  selector: 'app-tramites-id',
  templateUrl: './tramites-id.component.html',
  styleUrls: ['./tramites-id.component.css'],
})
export class TramitesIdComponent implements OnInit {
  @ViewChild('seccionTramitesId') seccionTramitesId: ElementRef;
  @ViewChild('seccionPuntoAtencion') seccionPuntoAtencion: ElementRef;
  @Input() informacionFicha: informacionFicha;

  botonAtras: { url: string, estadoMenuInferior: boolean, itemMenu: number };
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

  constructor(
    protected fichaTramiteService: TramitesPorIdService,
    protected servicioSideNav: SidenavService,
    protected servicioHeader: HeaderService,
    public bottomService: BottomMenuService,
    private activatedRoute: ActivatedRoute
  ) {
    this.fichaTramiteService.abrirPuntosAtencion.subscribe(
      async (data: DataBasicaPuntosInterface) => {
        await this.abrirPuntosAtencion(data);
      }
    );
  }

  ngOnInit(): void {
    this.botonAtras = {
      url: '/ficha-tramites-y-servicios',
      estadoMenuInferior: false,
      itemMenu: 1
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
    this.bottomService.ajustandoPantalla(false);
    this.topScroll = document.getElementById('topScroll') as HTMLElement;
    this.topScroll.style.height = '100%';
    this.topScroll.scrollTop = 0;
    this.topScroll.style.top = '0';

    this.cargarInformacionFicha(this.informacionFicha);
    this.urlPage = window.location.href;
  }

  private async cargarInformacionFicha(dataTramite: informacionFicha) {

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

          this.fichaTramiteService
            .GetBarraProcesoTramite(String(dataTramite.id))
            .subscribe((res) => {
              // debugger
              this.infoBasicaTramite.UrlTramiteEnLinea = res.urlTramite.match(
                /^https?:/
              )
                ? res.urlTramite
                : res.urlTramite.includes('embebido') &&
                  res.urlTramite.includes('tramites-y-servicios')
                  ? res.urlTramite
                  : res.urlTramite;
              this.infoBasicaTramite.EnLinea = res.isEnlinea;
            });
        },
        (error) => {
          console.log('error', error), (this.activarTramitesId = false);
        }, () => {
          this.activarTramitesId = true;
        }
      );
  }

  // to do
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
    if (this.activarPuntosAtecion == true) {
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
        this.seccionTramitesId.nativeElement.style.left == '0%'
          ? (this.activarPuntosAtecion = false)
          : null;
      }
    );
  }

  iteracionBotonRetroalimentaciona(estado: string) {
    let botonRetroalimentacion: HTMLElement = (
      document.querySelector('app-boton-retroalimentacion .button-container') as HTMLElement
    );
    estado == 'ocultar' ? botonRetroalimentacion.style.opacity = '0'
      : botonRetroalimentacion.style.opacity = '1', botonRetroalimentacion.style.zIndex = '7';
    botonRetroalimentacion.addEventListener('transitionend', () => {
      estado == 'mostrar' ? botonRetroalimentacion.style.zIndex = '7' : botonRetroalimentacion.style.zIndex = '-1';
    });
  }
}
