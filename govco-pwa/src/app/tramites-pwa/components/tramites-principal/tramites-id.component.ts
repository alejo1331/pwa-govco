import { Component, Input, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
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
  @Input() informacionFicha: { id: number, tipo: string | null, prefijo: string };
  infoBasicaTramite: any;
  nombreTramite: string;
  idTramite: number;
  audiencias: any[];
  embebidos: any;
  integrated: boolean = false;

  constructor(
    protected fichaTramiteService: TramitesPorIdService,
    protected servicioSideNav: SidenavService,
    protected servicioHeader: HeaderService,
    public bottomService: BottomMenuService
  ) { }

  ngOnInit(): void {
    this.loadDataInfoFicha(this.informacionFicha);
    this.idTramite = this.informacionFicha.id;
    this.servicioHeader.estadoHeader(false, false);
    this.bottomService.putOcultandoBottomMenu(true);
    this.servicioSideNav.seleccionandoItem(false, 'null');
    this.bottomService.ajustandoPantalla(false);
    const contenedorTopScroll = (document.getElementById('topScroll') as HTMLElement);
    contenedorTopScroll.style.top = '0';
    contenedorTopScroll.style.height = '100%';
    contenedorTopScroll.scrollTop = 0;
  }

  private async loadDataInfoFicha(dataTramite: any) {

    this.fichaTramiteService.GetTipoTramiteFichaEspecificaById(dataTramite.id).subscribe(dataFicha => {
      dataTramite ? this.GenerarTrackingTramite(dataTramite.id) : null;
      this.infoBasicaTramite = dataFicha;
      this.nombreTramite = this.infoBasicaTramite.NombreEstandarizado;
      this.fichaTramiteService.setTipoAtencionPresencial(this.infoBasicaTramite.TipoAtencionPresencial);
      this.fichaTramiteService.GetTiposAudienciaById(dataTramite.id).subscribe(n => {
        this.audiencias = n;
        console.log('audiencias',n)
        if (this.audiencias.length > 0) {
          this.loadMomentosAudiencia(dataTramite.id, this.audiencias[0].detalle);
        }
      });
      // Obtiene la URL de trámite en linea
      this.fichaTramiteService.GetBarraProcesoTramite(dataTramite.id).subscribe(res => {
        this.infoBasicaTramite.UrlTramiteEnLinea = res.urlTramite.match(/^https?:/) ? res.urlTramite : res.urlTramite.includes("embebido") && res.urlTramite.includes("tramites-y-servicios") ? res.urlTramite : res.urlTramite;
        this.infoBasicaTramite.EnLinea = res.isEnlinea;
      });
    });
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

  private loadMomentosAudiencia(idTramite: number, audiencias: string) {
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

  cargarMomentosAudiencia(data: any) {
    this.loadMomentosAudiencia(this.informacionFicha.id, data.detalle);
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

}
