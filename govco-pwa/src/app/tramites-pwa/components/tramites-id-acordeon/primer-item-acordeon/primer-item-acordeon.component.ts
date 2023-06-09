import { Component, OnInit, Input, SimpleChanges } from '@angular/core';
import { MomentosAudiencia } from 'src/app/tramites-pwa/models/acordeon/acordeon-interface';
import { TramitesPorIdService } from 'src/app/tramites-pwa/services/tramites-por-id-service/tramites-por-id.service';

@Component({
  selector: 'app-primer-item-acordeon',
  templateUrl: './primer-item-acordeon.component.html',
  styleUrls: ['./primer-item-acordeon.component.scss']
})
export class PrimerItemAcordeonComponent implements OnInit {
  @Input() dataAcordeon: { perfil: string, idTramite: number };
  @Input() tramiteEnLinea: boolean;
  @Input() itemActivoAnterior: number;

  dataItemAcordeon: MomentosAudiencia[];

  constructor(
    protected fichaTramiteService: TramitesPorIdService
  ) { }

  ngOnInit(): void {
    this.loadMomentosAudiencia();
  }

  ngOnChanges(changes: SimpleChanges) {
    if (changes.dataAcordeon) {
      this.dataAcordeon = changes.dataAcordeon.currentValue;
      if (!changes.dataAcordeon.previousValue || changes.dataAcordeon.currentValue.idTramite != changes.dataAcordeon.previousValue.idTramite ||
        changes.dataAcordeon.currentValue.perfil != changes.dataAcordeon.previousValue.perfil) {
        this.loadMomentosAudiencia();
      }
    }
    
    // Si en el acordeon padre el item que estaba desplegado era el primero, se cierra el acordeon
    if (changes.itemActivoAnterior && changes.itemActivoAnterior.currentValue === 0) {
      this.dataItemAcordeon.forEach(function (item, indexItem) {
        if (item.active) {
          $('button[data-target="#collapseItem' + indexItem + '"]').trigger('click');
          item.active = false;
        }        
      });
    }
  }

  private loadMomentosAudiencia() {
    this.fichaTramiteService.GetMomentosByIdAudiencia(this.dataAcordeon.idTramite, this.dataAcordeon.perfil).subscribe(n => {
      this.dataItemAcordeon = this.eliminarValoresRepetidosMomentos(n);
      document.getElementById('primerItemAcordeon')?.scrollIntoView({ behavior: 'smooth' });
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

  activarItem(index: number) {
    this.dataItemAcordeon[index].active = !this.dataItemAcordeon[index].active;
    this.dataItemAcordeon.forEach(function (item, indexItem) {
      if (indexItem != index) {
        item.active = false;
      }
    });

    if (this.dataItemAcordeon[index].active) {
      this.onClickItem(index > 0 ? ('item' + (index-1)) : 'paso0');
      this.cargarDetalleMomento(index);
    }
  }

  onClickItem(item: any) {
    setTimeout(()=>{
      document.getElementById(item)?.scrollIntoView({block: "start", behavior: "smooth"});
    }, 350)
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
    let excepcion: any = {};

    data.forEach((n: any) => {
      const indiceTipoAccion = tiposAccionCondicion.findIndex((t: any) => t === n.TipoAccionCondicion);

      if (!temp[indiceTipoAccion]) {
        temp[indiceTipoAccion] = {};
      }

      if (!temp[indiceTipoAccion][n.TipoAccionCondicion]) {
        temp[indiceTipoAccion][n.TipoAccionCondicion] = [];
      }

      if (n.Excepcion) {
        if (!excepcion['EXCEPCION']) {
          excepcion['EXCEPCION'] = [];
        }
        excepcion['EXCEPCION'].push(n);
      } else {
        if (!temp[indiceTipoAccion][n.TipoAccionCondicion]) {
          temp[indiceTipoAccion][n.TipoAccionCondicion] = [];
        }
        temp[indiceTipoAccion][n.TipoAccionCondicion].push(n);
      }

    });

    if (excepcion['EXCEPCION']) {
      excepcion['EXCEPCION'] = this.agruparExcepcionesPorId(excepcion['EXCEPCION']);
      temp.push(excepcion);
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
        temp[indiceTipoAccion] = {};
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
