import { Component, Input, OnInit, ElementRef, ViewChild } from '@angular/core';
import { ValidateUrlService } from 'src/app/tramites-pwa/services/validate-url.service';

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

  activarPuntosAtecion: boolean = false;

  topScroll: HTMLElement;

  constructor(
    public validateUrlService: ValidateUrlService
  ) { }

  ngOnInit(): void {
  }

}
