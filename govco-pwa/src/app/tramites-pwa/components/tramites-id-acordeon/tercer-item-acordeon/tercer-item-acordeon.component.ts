import { Component, Input, SimpleChanges } from '@angular/core';
import { DataBasicaPuntosInterface } from 'src/app/tramites-pwa/models/puntos-de-atencion/data-basica-puntos-interface';
import { TramitesPorIdService } from 'src/app/tramites-pwa/services/tramites-por-id-service/tramites-por-id.service';

@Component({
  selector: 'app-tercer-item-acordeon',
  templateUrl: './tercer-item-acordeon.component.html',
  styleUrls: ['./tercer-item-acordeon.component.scss']
})
export class TercerItemAcordeonComponent {
  @Input() dataAcordeon: any;
  canalesSeguimiento: any[];
  dataPuntosAtencion: DataBasicaPuntosInterface;

  constructor(
    protected fichaTramiteService: TramitesPorIdService,
  ) { }

  ngOnChanges(changes: SimpleChanges) {
    if (changes.dataAcordeon.currentValue != undefined) {
      this.dataAcordeon = changes.dataAcordeon.currentValue;
      this.getMediosSeguimiento(this.dataAcordeon)
    }
  }

  getMediosSeguimiento(dataAcordeon:any) {
    this.fichaTramiteService.GetMediosSeguimiento(dataAcordeon.idTramite)
    .subscribe(
      (data) => {
        this.canalesSeguimiento = data;
      },
      (error) => {
        console.error(error);
      }
    );
  }

  getPuntosAtencion(){
    const tipoAtencionPresencial = this.fichaTramiteService.getTipoAtencionPresencial();
    this.fichaTramiteService.GetPuntosAtencion(tipoAtencionPresencial, 3, this.dataAcordeon.idTramite, 0, 0).subscribe( () => {
        this.dataPuntosAtencion = {
          transitionPuntosAtencion: '0%',
          transitionTramitesId: '-100%',
          activar: true,
          idTipo: 2,
          idMomento: 0,
          idAccion: 0,
        }
        this.fichaTramiteService.getAbrirPuntos(this.dataPuntosAtencion);

      },
      error => {
        console.error(error);
      },
    );

  }
}
