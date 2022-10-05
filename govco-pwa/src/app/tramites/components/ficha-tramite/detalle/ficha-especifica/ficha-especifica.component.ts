import { Component, Input, OnInit } from '@angular/core';
import { NgbAccordionConfig, NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { BreadCrumbService } from 'src/app/tramites/services/bread-crumb.service';
import { FichaTramiteService } from 'src/app/tramites/services/ficha-tramite.service';
import { LoadingService } from 'src/app/tramites/services/loading.service';
import { UtilsService } from 'src/app/tramites/services/utils.service';
import { ModalAlertasComponent } from '../modal-alertas/modal-alertas.component';

@Component({
  selector: 'app-ficha-especifica',
  templateUrl: './ficha-especifica.component.html',
  styleUrls: ['./ficha-especifica.component.scss'],
  providers: [NgbAccordionConfig]
})
export class FichaEspecificaComponent implements OnInit {
  @Input() informacionFicha: any;

  infoBasicaTramite: any;
  nombreTramite: string;
  idTramite: number;
  audiencias: any[];
  embebidos: any;
  integrated: boolean = false;

  constructor(
    private fichaTramiteService: FichaTramiteService,
    private modalService: NgbModal,
    private breadCrumbService: BreadCrumbService,
    private utilsService: UtilsService,
    private loadingService: LoadingService,
  ) { }

  ngOnInit(): void {
    this.loadDataInfoFicha(this.informacionFicha);
    this.idTramite = this.informacionFicha.id;

    const todoListElement: any = document.querySelector('govco-area-servicios');
    todoListElement.addEventListener('errorurl', (ev: any) => this.errorUrlTramite(ev));
    todoListElement.addEventListener('startloading', (ev: any) => this.startLoading(ev));
    todoListElement.addEventListener('stoploading', (ev: any) => this.stopLoading(ev));
    todoListElement.addEventListener('openmodalexitwebsite', (ev: any) => this.openModalExitWebSite(ev));
  }

  private async loadDataInfoFicha(dataTramite: any) {

    this.fichaTramiteService.GetTipoTramiteFichaEspecificaById(dataTramite.id).subscribe(dataFicha => {
      dataTramite?this.GenerarTrackingTramite(dataTramite.id):null;
      this.infoBasicaTramite = dataFicha;
      console.log('data',this.infoBasicaTramite)
      this.breadCrumbService.setTittle(this.infoBasicaTramite.NombreEstandarizado);
      this.nombreTramite = this.infoBasicaTramite.NombreEstandarizado;
      this.fichaTramiteService.setTipoAtencionPresencial(this.infoBasicaTramite.TipoAtencionPresencial);
      this.fichaTramiteService.GetTiposAudienciaById(dataTramite.id).subscribe(n => {
        this.audiencias = n;
        if ( this.audiencias.length > 0 ) {
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

  private loadMomentosAudiencia(idTramite: number, audiencias: string ) {
    this.fichaTramiteService.GetMomentosByIdAudiencia(idTramite, audiencias ).subscribe( n => {
      this.audiencias.forEach( (item) => {
        if (item.detalle === audiencias) {
          item.momentos = this.eliminarValoresRepetidosMomentos(n);
        }
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

  cargarMomentosAudiencia(data: any) {
    this.loadMomentosAudiencia( this.informacionFicha.id, data.detalle);
  }

  cargarDetalleMomento(data: any) {
    this.fichaTramiteService.GetDataFichaByIdTramiteAudienciaIdMomento(this.informacionFicha.id, data.audiencia, data.momento)
      .subscribe((dataAccion: any) => {
        this.audiencias.forEach( (item) => {
              if (item.detalle ===  data.audiencia) {
                  item.momentos.forEach( (i: any) => {
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

    data.forEach( (n: any) => {
      const indiceTipoAccion = tiposAccionCondicion.findIndex( (t: any) => t === n.TipoAccionCondicion);

      if (!temp[indiceTipoAccion]) {
        temp[indiceTipoAccion] = [];
      }

      if (!temp[indiceTipoAccion][n.TipoAccionCondicion]) {
        temp[indiceTipoAccion][n.TipoAccionCondicion] = [];
      }

      if (n.Excepcion) {
        if (!temp['EXCEPCION']) {
          temp['EXCEPCION']   = [];
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

  private agruparExcepcionesPorId(data: any[]) {
    if (data.length === 0) {
      return data;
    }

    const temp: any = [];
    const tiposExcepcion = this.ordenaPorAccionesPor('ExcepcionId', data);

    data.forEach( n => {
      const indiceTipoAccion = tiposExcepcion.findIndex( (t: any) => t === n.ExcepcionId);

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

  private ordenaPorAccionesPor( opcion: string , data: any[]) {
    const temp = new Set();
    const dataRetorno: any = [];

    data.forEach( n => {
      if (opcion === 'ExcepcionId') {
        temp.add(n.ExcepcionId);
      } else {
        temp.add(n.TipoAccionCondicion);
      }
    });

    temp.forEach( (value1, value2, set) => {
      dataRetorno.push(value1);
    });

    return dataRetorno;
  }

  private eliminarValoresRepetidosMomentos(data: any[]) {

    const temp: any[] = [];
    const returnData: any[] = [];

    data.forEach( m => {
      if (!temp[m.Orden]) {
        temp[m.Orden] = [];
      }
      temp[m.Orden].push(m);
    });

    temp.forEach( n => {
      n = n.sort( (a: any, b: any) => {
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

  errorUrlTramite(e: any) {
    this.utilsService.openModalErrorValidateUrl();
  }

  startLoading(e: any) {
    this.loadingService.startLoading();
  }

  stopLoading(e: any) {
    this.loadingService.stopLoading();
  }

  openModalExitWebSite(e: any) {
    const modalRef = this.modalService.open(ModalAlertasComponent, {centered: true, windowClass: 'modal-alerta-salida vw-100'});
    if (e.detail.detail.componente === 'tramites') {
      // tslint:disable-next-line: max-line-length
      modalRef.componentInstance.message = 'Estás ingresando al sitio de ' + this.infoBasicaTramite.Entidad + ', con esta acción abrirás una nueva pestaña. ¡Te esperamos pronto!';
    } else {
      modalRef.componentInstance.message = 'Con esta acción abrirás una nueva pestaña. ¡Te esperamos pronto!'; 
    }
    modalRef.componentInstance.linkUrl = e.detail.detail.url;
  }
  salir(evento: any){
    try {
      if(evento.key === 'Escape'){
        document.getElementById('salir-seccion-tramite')?.focus()
      }
    } catch (error) {
      console.error(error)
    }
  }
  salirAcordeon(evento: any){
    try {
      if(evento.key === 'Escape'){
        document.getElementById('salir-seccion-acordeon')?.focus()
      }
    } catch (error) {
      console.error(error)
    }
  }
}
