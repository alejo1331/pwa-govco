import { Component, Input, OnInit } from '@angular/core';
import { TramitesPorIdService } from '../../services/tramites-por-id-service/tramites-por-id.service';

@Component({
  selector: 'app-tramites-id-acordeon',
  templateUrl: './tramites-id-acordeon.component.html',
  styleUrls: ['./tramites-id-acordeon.component.scss']
})
export class TramitesIdAcordeonComponent implements OnInit {
  @Input() informacionFicha: any;

  infoBasicaTramite: any;
  nombreTramite: string;
  audiencias: any[];

  public items = [
    {
      active: false,
      titulo: 'Título #1 del acordeón',
      descripcion: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nam gravida.'
    }, 
    {
      active: false,
      titulo: 'Título #2 del acordeón',
      descripcion: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nam gravida.'
    },
    {
      active: false,
      titulo: 'Título #3 del acordeón',
      descripcion: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nam gravida.'
    }      
  ]

  constructor(
    protected fichaTramiteService: TramitesPorIdService
    ) { }

  ngOnInit(): void {
    this.loadDataInfoFicha(this.informacionFicha);
  }

  activarItem(index:number) {
    this.items[index].active = !this.items[index].active;
    this.items.forEach(function(item, indexItem){
      if (indexItem != index) {
        item.active = false;
      }
    });
  }

  private async loadDataInfoFicha(dataTramite: any) {

    this.fichaTramiteService.GetTipoTramiteFichaEspecificaById(dataTramite.id).subscribe(dataFicha => {
      dataTramite?this.GenerarTrackingTramite(dataTramite.id):null;
      this.infoBasicaTramite = dataFicha;
      // this.breadCrumbService.setTittle(this.infoBasicaTramite.NombreEstandarizado);
      this.nombreTramite = this.infoBasicaTramite.NombreEstandarizado;
      this.fichaTramiteService.setTipoAtencionPresencial(this.infoBasicaTramite.TipoAtencionPresencial);
      this.fichaTramiteService.GetTiposAudienciaById(dataTramite.id).subscribe(n => {
        this.audiencias = n;
        if ( this.audiencias.length > 0 ) {
          this.loadMomentosAudiencia(dataTramite.id, this.audiencias[0].detalle);
        }
        console.log('aquiiiiii', this.audiencias);
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

}
