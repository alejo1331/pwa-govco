import { Component, Input } from '@angular/core';
import { ValidateUrlService } from 'src/app/tramites-pwa/services/validate-url.service';
import { TramitesPorIdService } from 'src/app/tramites-pwa/services/tramites-por-id-service/tramites-por-id.service';
import { AccionSolicitud } from 'src/app/tramites-pwa/models/acordeon/acordeon-interface';
import { DataBasicaPuntosInterface } from 'src/app/tramites-pwa/models/puntos-de-atencion/data-basica-puntos-interface';

@Component({
  selector: 'app-accion-solicitud',
  templateUrl: './accion-solicitud.component.html',
  styleUrls: ['./accion-solicitud.component.scss']
})
export class AccionSolicitudComponent {

  @Input() data: AccionSolicitud[];

  dataPuntosAtencion: DataBasicaPuntosInterface;

  constructor(
    public validateUrlService: ValidateUrlService,
    protected TramitesPorIdservice: TramitesPorIdService
  ) { }

  abrirPuntosAtencionClic(idMomento:number, idAccion:number) {
    this.dataPuntosAtencion = {
      transitionPuntosAtencion: '0%',
      transitionTramitesId: '-100%',
      activar: true,
      idTipo: 2,
      idMomento: idMomento,
      idAccion: idAccion,
    }
    this.TramitesPorIdservice.getAbrirPuntos(this.dataPuntosAtencion);
  }
}
