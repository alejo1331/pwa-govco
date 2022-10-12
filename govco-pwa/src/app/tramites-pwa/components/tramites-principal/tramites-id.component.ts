import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { BottomMenuService } from 'src/app/transversales/services/bottom-menu/bottom-menu.service';
import { HeaderService } from 'src/app/transversales/services/header-service/header.service';
import { SidenavService } from 'src/app/transversales/services/sidenav-service/sidenav-service.service';
import { TramitesPorIdService } from '../../services/tramites-por-id-service/tramites-por-id.service';
import { TipoEnlace, TipoAudiencia, informacionFicha } from '../../models/tramites-id-models/tramites-por-id-interface';
import { AccionSolicitudInterface } from '../../models/acciones-solicitud/accion-solicitud-interface';

@Component({
  selector: 'app-tramites-id',
  templateUrl: './tramites-id.component.html',
  styleUrls: ['./tramites-id.component.css'],
})
export class TramitesIdComponent implements OnInit {
  @ViewChild('seccionTramitesId') seccionTramitesId: ElementRef;
  @ViewChild('seccionPuntoAtencion') seccionPuntoAtencion: ElementRef;

  topScroll: HTMLElement;

  informacionFicha: informacionFicha;
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
      async (data: AccionSolicitudInterface) => {
        await this.abrirPuntosAtencion([
          data.abrirPuntos,
          data.cerrarTramiteId,
          data.activar
        ]);
      }
    );
  }

  ngOnInit(): void {
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
    this.informacionFicha = { id: 0, tipo: null, prefijo: '' };

    this.servicioHeader.estadoHeader(false, false);
    this.bottomService.putOcultandoBottomMenu(true);
    this.servicioSideNav.seleccionandoItem(false, 'null');
    this.bottomService.ajustandoPantalla(false);
    this.topScroll = document.getElementById('topScroll') as HTMLElement;
    this.topScroll.style.height = '100%';
    this.topScroll.scrollTop = 0;
    this.topScroll.style.top = '0';

    this.filtradoId_T();
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
          // Obtiene la URL de trámite en linea
          this.fichaTramiteService
            .GetBarraProcesoTramite(dataTramite.id)
            .subscribe((res) => {
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

  abrirPuntosAtencion([abrirPuntosAtencion, cerrarTramitesId, activar]: [string, string, boolean]) {
    this.activarPuntosAtecion = activar;
    if (this.activarPuntosAtecion == true) {
      this.seccionTramitesId.nativeElement.style.left = cerrarTramitesId;
      this.seccionPuntoAtencion.nativeElement.style.left = abrirPuntosAtencion;
      this.topScroll.scrollTop = 0;
    }
  }

  cerrarPuntosAtencion([cerrarPuntosAtencion, abrirTramitesId]: [string, string]) {
    this.seccionTramitesId.nativeElement.style.left = abrirTramitesId;
    this.seccionPuntoAtencion.nativeElement.style.left = cerrarPuntosAtencion;
    this.topScroll.scrollTop = 0;
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
    estado == 'ocultar'? botonRetroalimentacion.style.opacity = '0': botonRetroalimentacion.removeAttribute('style');
    botonRetroalimentacion.addEventListener('transitionend', () => {
      estado == 'ocultar'? botonRetroalimentacion.style.zIndex = '-1' : botonRetroalimentacion.removeAttribute('style')
    });
  }

  //Esta seccion se encuentra en general.component.html en la seccion de Tramites ...

  filtradoId_T() {
    const parametroid = this.activatedRoute.snapshot.params.id;
    let idTramiteTemp = parametroid;

    if (parametroid !== 'embebido') {
      this.informacionFicha.id = parametroid.substring(1);
      this.idTramite = parametroid.substring(1);
      this.informacionFicha.prefijo = parametroid.substring(0, 1).toLowerCase();

      // Tramite suit
      if (this.informacionFicha.prefijo === 't') {
        idTramiteTemp = this.informacionFicha.id;
      }

      if (idTramiteTemp != null && idTramiteTemp != 'null') {
        this.fichaTramiteService
          .GetTipoFichaTramite(idTramiteTemp)
          .subscribe((data) => {
            this.informacionFicha.tipo = data.StatusCode;
          });
      }
    } else {
      this.embebido = true;
    }
  }
}
