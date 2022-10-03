import { Component, OnInit, Input } from '@angular/core';
import { TramitesPorIdService } from 'src/app/tramites-pwa/services/tramites-por-id-service/tramites-por-id.service';

@Component({
  selector: 'app-primer-item-acordeon',
  templateUrl: './primer-item-acordeon.component.html',
  styleUrls: ['./primer-item-acordeon.component.scss']
})
export class PrimerItemAcordeonComponent implements OnInit {
  @Input() informacionFicha: any;

  dataAcordeon: any[];

  constructor(
    protected fichaTramiteService: TramitesPorIdService
  ) { }

  ngOnInit(): void {
    this.loadMomentosAudiencia(this.informacionFicha.id, "Ciudadano");
  }

  private loadMomentosAudiencia(idTramite: number, perfil: string ) {
    this.fichaTramiteService.GetMomentosByIdAudiencia(idTramite, perfil ).subscribe( n => {
      this.dataAcordeon = this.eliminarValoresRepetidosMomentos(n);
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
}
