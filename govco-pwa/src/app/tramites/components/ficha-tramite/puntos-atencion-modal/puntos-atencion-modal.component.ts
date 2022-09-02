import { Component, Input, OnInit } from '@angular/core';
import { NgbActiveModal, NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { OrderPipe } from 'ngx-order-pipe';
import { UtilsService } from 'src/app/tramites/services/utils.service';
import { ValidateUrlService } from 'src/app/tramites/services/validate-url.service';
import { MapaModalComponent } from '../mapa-modal/mapa-modal.component';

@Component({
  selector: 'app-puntos-atencion-modal',
  templateUrl: './puntos-atencion-modal.component.html',
  styleUrls: ['./puntos-atencion-modal.component.scss']
})
export class PuntosAtencionModalComponent implements OnInit {

  @Input() puntosAtencion: string;
  @Input() normatividad: string;

  p = 1;
  serchText: any;
  order = 'PuntoAtencionNombre';
  reverseDepartamento = false;
  reversePunto = false;
  sortedCollection: any[];

  constructor(
    private modalService: NgbModal,
    private activeModal: NgbActiveModal,
    private validateUrlService: ValidateUrlService,
    private utilsService: UtilsService,
    private orderPipe: OrderPipe
  ) {
    this.sortedCollection = orderPipe.transform(this.puntosAtencion, 'PuntoAtencionNombre');
  }

  ngOnInit(): void {
  }

  printCoordenadas(latitud:any, longitud:any, direccion:any){
    const modal = this.modalService.open(MapaModalComponent,{ size: 'lg', backdrop: 'static', keyboard: false});
    modal.componentInstance.latitud = latitud;
    modal.componentInstance.longitud = longitud;
    modal.componentInstance.direccion = direccion;
  }

  closeModal() {
    this.activeModal.close();
  }

  validateUrl(url: string, e: any) {
    e.preventDefault();
    this.validateUrlService.validate(url)
      .subscribe((data: boolean) => {
        if (data) {
          url = url.match(/^https?:/) ? url : '//' + url;
          location.href = url;
        } else {
          this.utilsService.openModalErrorValidateUrl();
        }
      });
  }

  setOrder(value: string) {
    if (value === 'PuntoAtencionNombre') {
      this.reversePunto = !this.reversePunto;
    } else {
      this.reverseDepartamento = !this.reverseDepartamento;
    }
    this.order = value;
  }

}
