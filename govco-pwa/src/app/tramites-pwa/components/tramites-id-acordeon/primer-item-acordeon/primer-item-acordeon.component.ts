import { Component, OnInit, Input, SimpleChanges } from '@angular/core';
import { TramitesPorIdService } from 'src/app/tramites-pwa/services/tramites-por-id-service/tramites-por-id.service';

@Component({
  selector: 'app-primer-item-acordeon',
  templateUrl: './primer-item-acordeon.component.html',
  styleUrls: ['./primer-item-acordeon.component.scss']
})
export class PrimerItemAcordeonComponent implements OnInit {
  @Input() dataAcordeon: any;

  dataItemAcordeon: any[];

  constructor(
    protected fichaTramiteService: TramitesPorIdService
  ) { }

  ngOnInit(): void {
    this.loadMomentosAudiencia();
  }

  ngOnChanges(changes: SimpleChanges) {
    if (changes.dataAcordeon) {
      if (!changes.dataAcordeon.previousValue) {
        this.loadMomentosAudiencia();
      } else if (changes.dataAcordeon.currentValue.idTramite != changes.dataAcordeon.previousValue.idTramite ||
        changes.dataAcordeon.currentValue.perfil != changes.dataAcordeon.previousValue.perfil) {
        this.loadMomentosAudiencia();
      }
    }
  }

  private loadMomentosAudiencia() {
    this.fichaTramiteService.GetMomentosByIdAudiencia(this.dataAcordeon.idTramite, this.dataAcordeon.perfil).subscribe( n => {
      this.dataItemAcordeon = this.eliminarValoresRepetidosMomentos(n);
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

  activarItem(index:number) {
    this.dataItemAcordeon[index].active = !this.dataItemAcordeon[index].active;
    this.dataItemAcordeon.forEach(function(item, indexItem){
      if (indexItem != index) {
        item.active = false;
      }
    });

    if (this.dataItemAcordeon[index].active) {
      this.cargarDetalleMomento(index);
    }
  }

  private cargarDetalleMomento(index: number) {
    this.fichaTramiteService.GetDataFichaByIdTramiteAudienciaIdMomento(this.dataAcordeon.idTramite, this.dataAcordeon.perfil, this.dataItemAcordeon[index].MomentoId)
      .subscribe((dataAccion: any) => {
        this.dataItemAcordeon[index].acciones = dataAccion.acciones;
      });
      });
  }
}
