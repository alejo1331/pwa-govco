import { Component, Input, OnInit } from '@angular/core';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { FichaTramiteService } from 'src/app/tramites/services/ficha-tramite.service';
import { PuntosAtencionModalComponent } from '../../puntos-atencion-modal/puntos-atencion-modal.component';

@Component({
  selector: 'app-atencion',
  templateUrl: './atencion.component.html',
  styleUrls: ['./atencion.component.scss']
})
export class AtencionComponent implements OnInit {

  @Input() data: any;
  @Input() areaServicio = false;

  showComponent = true;

  constructor(
    private fichaTramiteService: FichaTramiteService,
    private modalService: NgbModal
  ) { }

  ngOnInit(): void {
    console.log('data', this.data)
    console.log('areaServicio', this.areaServicio)
    if (!this.data.EnLinea && this.areaServicio) {
      this.showComponent = false;
    }
  }

  getPuntosAtencion() {
    console.log('data.IdTramite', this.data.IdTramite)
    const tipoAtencionPresencial = this.fichaTramiteService.getTipoAtencionPresencial();
    this.fichaTramiteService.GetPuntosAtencion(tipoAtencionPresencial, 1, this.data.IdTramite, 0, 0).subscribe(
      // Success response
      response => {
      console.log('infor puntos',response)

        this.showModal({ tipo: 'puntos', data: response });
      },
      // Failure response
      error => {
        console.error(error);
      },
    );
  }

  showModal(data: { tipo: string; data: any; }) {
    console.log('data.data',data.tipo);
    (document.getElementById('topScroll') as HTMLElement).style.filter = "blur(6px)"
    const modal = this.modalService.open(PuntosAtencionModalComponent, {
      size: 'lg',
      backdrop: 'static',
      keyboard: false
    });
    if (data.tipo === 'puntos') {
      modal.componentInstance.puntosAtencion = data.data;
    }
    if (data.tipo === 'normatividad') {
      modal.componentInstance.normatividad = data.data;
    }
  }

  isIE() {
    const ua = navigator.userAgent;
    const isIe = ua.indexOf('MSIE ') > -1 || ua.indexOf('Trident/') > -1;
    return isIe;
  }

}
