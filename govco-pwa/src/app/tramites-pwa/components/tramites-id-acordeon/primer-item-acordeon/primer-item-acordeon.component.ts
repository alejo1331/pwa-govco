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
      this.dataAcordeon = changes.dataAcordeon.currentValue;
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
      console.log('this.dataItemAcordeon', n)
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
        this.dataItemAcordeon[index].acciones = this.agrupaAccionesPorTipoAccionCondicion(dataAccion.acciones);
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
}
