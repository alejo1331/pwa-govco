import { Component, Input, OnInit, ElementRef, ViewChild, Output, EventEmitter } from '@angular/core';
import { ValidateUrlService } from 'src/app/tramites-pwa/services/validate-url.service';
import { TramitesPorIdService } from 'src/app/tramites-pwa/services/tramites-por-id-service/tramites-por-id.service';
import { AccionSolicitudInterface } from 'src/app/tramites-pwa/models/acciones-solicitud/accion-solicitud-interface';
import { AccionSolicitud } from 'src/app/tramites-pwa/models/acordeon/acordeon-interface';

@Component({
  selector: 'app-accion-solicitud',
  templateUrl: './accion-solicitud.component.html',
  styleUrls: ['./accion-solicitud.component.scss']
})
export class AccionSolicitudComponent implements OnInit {
  
  @Input() data: AccionSolicitud[];

  dataPuntosAtencion: AccionSolicitudInterface;

  constructor(
    public validateUrlService: ValidateUrlService,
    protected TramitesPorIdservice: TramitesPorIdService
  ) { }

  ngOnInit(): void {
  }

  abrirPuntosAtencionClic(idMomento:number, idAccion:number) {
    this.dataPuntosAtencion = {
      abrirPuntos: '0%',
      cerrarTramiteId: '-100%',
      idTipo: 2,
      idMomento: idMomento,
      idAccion: idAccion,
    }
    this.TramitesPorIdservice.getAbrirPuntos(this.dataPuntosAtencion);
  }
}
