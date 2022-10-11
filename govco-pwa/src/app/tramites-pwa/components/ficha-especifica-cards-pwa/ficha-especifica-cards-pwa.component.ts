import { Component, EventEmitter, OnInit, Input, Output } from '@angular/core';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { ModalTutorialesPwaComponent } from '../modal-tutoriales-pwa/modal-tutoriales-pwa.component';
import { ModalDudasPwaComponent } from '../modal-dudas-pwa/modal-dudas-pwa.component';
import { TramitesPorIdService } from '../../services/tramites-por-id-service/tramites-por-id.service';

@Component({
  selector: 'app-ficha-especifica-cards-pwa',
  templateUrl: './ficha-especifica-cards-pwa.component.html',
  styleUrls: ['./ficha-especifica-cards-pwa.component.scss'],
})
export class FichaEspecificaCardsPwaComponent implements OnInit {
  @Input() infoTramite: any;
  @Input() itemid: number;
  @Output() cerrarPuntosAtencion = new EventEmitter<[string, string]>();
  canalesSeguimiento: any[];

  constructor(
    private modalService: NgbModal,
    private fichaTramiteService: TramitesPorIdService
  ) {}

  ngOnInit(): void {
    this.getDataContactoDudas(this.itemid);
  }

  getDataContactoDudas(tramiteid: number) {
    this.fichaTramiteService.GetDataContactoDudas(tramiteid).subscribe(
      (data) => {
        // Success
        this.canalesSeguimiento = data.reverse();
      },
      (error) => {
        console.error(error);
      }
    );
  }

  openTutoriales() {
    if (this.infoTramite?.UrlManualEnLinea) {
      const modalRef = this.modalService.open(ModalTutorialesPwaComponent, {
        size: 'lg',
        backdrop: 'static',
        keyboard: false,
        centered: true,
        windowClass: 'background-modal',
      });
      modalRef.componentInstance.data = this.infoTramite.UrlManualEnLinea;
    }
  }

  openDudas() {
    const modalRef = this.modalService.open(ModalDudasPwaComponent, {
      size: 'lg',
      backdrop: 'static',
      keyboard: false,
      centered: true,
      windowClass: 'background-modal',
    });
    modalRef.componentInstance.canalesSeguimiento = this.canalesSeguimiento;
  }
  abrirPuntosAtencion() {
    const cerrarPuntosAtencion: string = '0%';
    const AbrirTramitesId: string = '-100%';
    this.cerrarPuntosAtencion.emit([cerrarPuntosAtencion, AbrirTramitesId]);
  }
}
