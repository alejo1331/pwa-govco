import { Component, Input, OnInit, ElementRef, ViewChild, Output, EventEmitter } from '@angular/core';
import { ValidateUrlService } from 'src/app/tramites-pwa/services/validate-url.service';
import { TramitesPorIdService } from 'src/app/tramites-pwa/services/tramites-por-id-service/tramites-por-id.service';
import { AccionSolicitudInterface } from 'src/app/tramites-pwa/models/accion-solicitud/accion-solicitud-interface';

@Component({
  selector: 'app-accion-solicitud',
  templateUrl: './accion-solicitud.component.html',
  styleUrls: ['./accion-solicitud.component.scss']
})
export class AccionSolicitudComponent implements OnInit {
  @ViewChild('seccionTramitesId') seccionTramitesId: ElementRef;
  @ViewChild('seccionPuntoAtencion') seccionPuntoAtencion: ElementRef;

  @Input() data: any;
  @Input() dataAcordeon: any;

  dataPuntosAtencion: AccionSolicitudInterface;


  activarPuntosAtecion: boolean = false;

  topScroll: HTMLElement;

  constructor(
    public validateUrlService: ValidateUrlService,
    protected TramitesPorIdservice: TramitesPorIdService
  ) { }

  ngOnInit(): void {
  }

  abrirPuntosAtencionClic() {
    this.dataPuntosAtencion = {
      abrirPuntos: '0%',
      cerrarTramiteId: '-100%',
      id1: 'string',
      id2: 'string',
      id3: 'string',
    }
    this.TramitesPorIdservice.getAbrirPuntos(this.dataPuntosAtencion);
  }

}
