import { UtilsService } from 'src/app/tramites/services/utils.service';
import { ValidateUrlService } from 'src/app/tramites/services/validate-url.service';
import { Component, Input, OnInit } from '@angular/core';
import { NgbActiveModal, NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { OrderPipe } from 'ngx-order-pipe';

@Component({
  selector: 'app-modal-fechas-disponibles',
  templateUrl: './modal-fechas-disponibles.component.html',
  styleUrls: ['./modal-fechas-disponibles.component.scss']
})
export class ModalFechasDisponiblesComponent implements OnInit {

  @Input() fechas: string;
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
    private orderPipe: OrderPipe) {
      this.sortedCollection = orderPipe.transform(this.fechas, 'PuntoAtencionNombre');
    }

  ngOnInit() {

  }

  closeModal() {
    this.activeModal.close();
  }

  validateUrl(url: string, e:any) {
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
