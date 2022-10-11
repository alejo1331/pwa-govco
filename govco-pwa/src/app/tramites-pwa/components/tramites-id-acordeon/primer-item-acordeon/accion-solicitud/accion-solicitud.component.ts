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
    this.topScroll = (document.getElementById('topScroll') as HTMLElement)
    this.topScroll.style.height = '100%';
    this.topScroll.scrollTop = 0;
    this.topScroll.style.top = '0';
  }

  abrirPuntosAtencion() {
    this.activarPuntosAtecion = true;
    const abrirPuntosAtencion: string = '0%';
    const cerrarTramitesId: string = '-100%';
    this.seccionTramitesId.nativeElement.style.left = cerrarTramitesId;
    this.seccionPuntoAtencion.nativeElement.style.left = abrirPuntosAtencion;
    this.topScroll.scrollTop = 0;
  }

  cerrarPuntosAtencion([cerrarPuntosAtencion, abrirTramitesId]: [string, string]) {
    this.seccionTramitesId.nativeElement.style.left = abrirTramitesId;
    this.seccionPuntoAtencion.nativeElement.style.left = cerrarPuntosAtencion;
    this.topScroll.scrollTop = 0;
    this.seccionTramitesId.nativeElement.addEventListener("transitionend", () => {
      this.seccionTramitesId.nativeElement.style.left == '0%' ?
        this.activarPuntosAtecion = false : null;
    })
  }

}
