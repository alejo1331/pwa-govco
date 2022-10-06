import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { BottomMenuService } from 'src/app/transversales/services/bottom-menu/bottom-menu.service';
import { HeaderService } from 'src/app/transversales/services/header-service/header.service';
import { SidenavService } from 'src/app/transversales/services/sidenav-service/sidenav-service.service';
import { TramitesPorIdService } from '../../services/tramites-por-id-service/tramites-por-id.service';

@Component({
  selector: 'app-tramites-id',
  templateUrl: './tramites-id.component.html',
  styleUrls: ['./tramites-id.component.css']
})
export class TramitesIdComponent implements OnInit {
  @ViewChild('seccionTramitesId') seccionTramitesId: ElementRef;
  @ViewChild('seccionPuntoAtencion') seccionPuntoAtencion: ElementRef;

  topScroll : HTMLElement;

  informacionFicha: { id: number, tipo: string | null, prefijo: string };
  estructuraModalDesplegable: { titulo: string, icono: string }[];
  dataAcordeon: { perfil: string, idTramite: number }
  infoBasicaTramite: any;
  nombreTramite: string;
  idTramite: number;
  audiencias: any[];
  embebidos: any;
  integrated: boolean = false;
  embebido: boolean = false;

  constructor(
    protected fichaTramiteService: TramitesPorIdService,
    protected servicioSideNav: SidenavService,
    protected servicioHeader: HeaderService,
    public bottomService: BottomMenuService,
    private activatedRoute: ActivatedRoute,
  ) { }

  ngOnInit(): void {
    this.estructuraModalDesplegable = [
      { titulo: 'Ciudadano', icono: '../../../../assets/icons-fonts/account_circle_FILL1_wght500_GRAD0_opsz20.svg' },
      { titulo: 'Extranjero', icono: '../../../../assets/icons-fonts/badge_FILL0_wght500_GRAD0_opsz20.svg' },
      { titulo: 'Empresa privada', icono: '../../../../assets/icons-fonts/apartment_FILL0_wght500_GRAD0_opsz20.svg' },
      { titulo: 'Entidad pública', icono: '../../../../assets/icons-fonts/account_balance_FILL0_wght500_GRAD0_opsz20.svg' },
    ]
    this.informacionFicha = { id: 0, tipo: null, prefijo: '' };

    this.servicioHeader.estadoHeader(false, false);
    this.bottomService.putOcultandoBottomMenu(true);
    this.servicioSideNav.seleccionandoItem(false, 'null');
    this.bottomService.ajustandoPantalla(false);
    this.topScroll = (document.getElementById('topScroll') as HTMLElement)
    this.topScroll.style.height = '100%';
    this.topScroll.scrollTop = 0;
    this.topScroll.style.top = '0';


    this.loadData();

    this.loadDataInfoFicha(this.informacionFicha);
    this.idTramite = this.informacionFicha.id;
  }

  private async loadDataInfoFicha(dataTramite: any) {

    this.fichaTramiteService.GetTipoTramiteFichaEspecificaById(dataTramite.id).subscribe(dataFicha => {
      dataTramite ? this.GenerarTrackingTramite(dataTramite.id) : null;
      this.infoBasicaTramite = dataFicha;
      this.nombreTramite = this.infoBasicaTramite.NombreEstandarizado;
      this.fichaTramiteService.setTipoAtencionPresencial(this.infoBasicaTramite.TipoAtencionPresencial);
      this.fichaTramiteService.GetTiposAudienciaById(dataTramite.id).subscribe(n => {
        this.audiencias = n
        if (this.audiencias.length > 0) {
          this.cargarMomentosAudiencia(dataTramite.id, this.audiencias[0].detalle);
        }
      });
      // Obtiene la URL de trámite en linea
      this.fichaTramiteService.GetBarraProcesoTramite(dataTramite.id).subscribe(res => {
        this.infoBasicaTramite.UrlTramiteEnLinea = res.urlTramite.match(/^https?:/) ? res.urlTramite : res.urlTramite.includes("embebido") && res.urlTramite.includes("tramites-y-servicios") ? res.urlTramite : res.urlTramite;
        this.infoBasicaTramite.EnLinea = res.isEnlinea;
      });
    });
  }

  perfilSeleccionado(perfil: string) {
    this.dataAcordeon = {
      perfil: perfil,
      idTramite: this.informacionFicha.id
    }
    this.cargarMomentosAudiencia(this.informacionFicha.id, perfil);
  }

  abrirPuntosAtencion() {
    const abrirPuntosAtencion: string = '0';
    const cerrarTramitesId: string = '-100%';
    this.seccionTramitesId.nativeElement.style.left = cerrarTramitesId;
    this.seccionPuntoAtencion.nativeElement.style.left = abrirPuntosAtencion;
    this.topScroll.scrollTop = 0;
  }

  cerrarPuntosAtencion([cerrarPuntosAtencion, abrirTramitesId]: [string, string]) {
    this.seccionTramitesId.nativeElement.style.left = abrirTramitesId;
    this.seccionPuntoAtencion.nativeElement.style.left = cerrarPuntosAtencion;
    this.topScroll.scrollTop = 0;
  }

  private async GenerarTrackingTramite(id: any) {

    this.fichaTramiteService.GenerarTrackingTramite(id).subscribe(
      (resp: any) => {
        console.log(resp);
      },
      (error) => {
        console.error(error);
      }
    );
  }

  private cargarMomentosAudiencia(idTramite: number, audiencias: string) {
    this.fichaTramiteService.GetMomentosByIdAudiencia(idTramite, audiencias).subscribe(n => {
      this.audiencias.forEach((item) => {
        if (item.detalle === audiencias) {
          item.momentos = this.eliminarValoresRepetidosMomentos(n);
        }
      });

    });
  }

  private eliminarValoresRepetidosMomentos(data: any[]) {
    const temp: any[] = [];
    const returnData: any[] = [];

    data.forEach(m => {
      if (!temp[m.Orden]) {
        temp[m.Orden] = [];
      }
      temp[m.Orden].push(m);
    });

    temp.forEach(n => {
      n = n.sort((a: any, b: any) => {
        if (a.MomentoId < b.MomentoId) {
          return 1;
        }
        if (a.MomentoId > b.MomentoId) {
          return -1;
        }
        return 0;
      });

      returnData.push(n[0]);
    });

    return returnData;
  }

  cargarDetalleMomento(data: any) {
    this.fichaTramiteService.GetDataFichaByIdTramiteAudienciaIdMomento(this.informacionFicha.id, data.audiencia, data.momento)
      .subscribe((dataAccion: any) => {
        this.audiencias.forEach((item) => {
          if (item.detalle === data.audiencia) {
            item.momentos.forEach((i: any) => {
              if (i.MomentoId === data.momento) {
                i.acciones = this.agrupaAccionesPorTipoAccionCondicion(dataAccion.acciones);
              }
            });
          }
        });
      });
  }

  private agrupaAccionesPorTipoAccionCondicion(data: any) {
    const temp: any = [];
    const tiposAccionCondicion = this.ordenaPorAccionesPor('TipoAccionCondicion', data);

    data.forEach((n: any) => {
      const indiceTipoAccion = tiposAccionCondicion.findIndex((t: any) => t === n.TipoAccionCondicion);

      if (!temp[indiceTipoAccion]) {
        temp[indiceTipoAccion] = [];
      }

      if (!temp[indiceTipoAccion][n.TipoAccionCondicion]) {
        temp[indiceTipoAccion][n.TipoAccionCondicion] = [];
      }

      if (n.Excepcion) {
        if (!temp['EXCEPCION']) {
          temp['EXCEPCION'] = [];
        }
        temp['EXCEPCION'].push(n);
      } else {
        if (!temp[indiceTipoAccion][n.TipoAccionCondicion]) {
          temp[indiceTipoAccion][n.TipoAccionCondicion] = [];
        }
        temp[indiceTipoAccion][n.TipoAccionCondicion].push(n);
      }

    });

    if (temp['EXCEPCION']) {
      temp['EXCEPCION'] = this.agruparExcepcionesPorId(temp['EXCEPCION']);
    }

    return temp;
  }

  private ordenaPorAccionesPor(opcion: string, data: any[]) {
    const temp = new Set();
    const dataRetorno: any = [];

    data.forEach(n => {
      if (opcion === 'ExcepcionId') {
        temp.add(n.ExcepcionId);
      } else {
        temp.add(n.TipoAccionCondicion);
      }
    });

    temp.forEach((value1, value2, set) => {
      dataRetorno.push(value1);
    });

    return dataRetorno;
  }

  private agruparExcepcionesPorId(data: any[]) {
    if (data.length === 0) {
      return data;
    }

    const temp: any = [];
    const tiposExcepcion = this.ordenaPorAccionesPor('ExcepcionId', data);

    data.forEach(n => {
      const indiceTipoAccion = tiposExcepcion.findIndex((t: any) => t === n.ExcepcionId);

      if (!temp[indiceTipoAccion]) {
        temp[indiceTipoAccion] = [];
      }

      if (!temp[indiceTipoAccion][n.TipoAccionCondicion]) {
        temp[indiceTipoAccion][n.TipoAccionCondicion] = [];
      }

      if (!temp[indiceTipoAccion][n.TipoAccionCondicion]) {
        temp[indiceTipoAccion][n.TipoAccionCondicion] = [];
      }
      temp[indiceTipoAccion]['Excepcion'] = n.Excepcion;
      temp[indiceTipoAccion][n.TipoAccionCondicion].push(n);
    });
    return temp;
  }

  //Esta seccion se encuentra en general.component.html en la seccion de Tramites ... 

  loadData() {
    const parametroid = this.activatedRoute.snapshot.params.id;
    let idTramiteTemp = parametroid;

    if (parametroid !== 'embebido') {
      this.informacionFicha.id = parametroid.substring(1);
      this.informacionFicha.prefijo = parametroid.substring(0, 1).toLowerCase();

      // Tramite suit
      if (this.informacionFicha.prefijo === 't') {
        // this.fichaespecificaService.setTramite(this.informacionFicha);
        idTramiteTemp = this.informacionFicha.id;
      }

      if (idTramiteTemp != null && idTramiteTemp != 'null') {
        this.fichaTramiteService.GetTipoFichaTramite(idTramiteTemp)
          .subscribe(data => {
            this.informacionFicha.tipo = data.StatusCode;
          });
      }

    } else {
      this.embebido = true;
    }
  }

}
