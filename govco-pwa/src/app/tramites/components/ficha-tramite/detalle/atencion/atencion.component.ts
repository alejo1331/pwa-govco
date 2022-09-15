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
    if (!this.data.EnLinea && this.areaServicio ) {
      this.showComponent = false;
    }
  }

  getPuntosAtencion() {
    const tipoAtencionPresencial = this.fichaTramiteService.getTipoAtencionPresencial();
    this.fichaTramiteService.GetPuntosAtencion(tipoAtencionPresencial, 1, this.data.IdTramite, 0, 0).subscribe(
      // Success response
      response => {
          this.showModal({tipo: 'puntos', data:  response});
          console.log("response",response)
      },
      // Failure response
      error => {
        console.error(error);
      },
    );
  }

  showModal(data: { tipo: string; data: any; }) {
    const modal = this.modalService.open(PuntosAtencionModalComponent, { size: 'lg',
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
