import { Component, Input } from '@angular/core';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';

@Component({
  selector: 'app-modal-alertas',
  templateUrl: './modal-alertas.component.html',
  styleUrls: ['./modal-alertas.component.scss']
})
export class ModalAlertasComponent {

  @Input() message: any;
  @Input() linkUrl: any;
  constructor(
    public activeModal: NgbActiveModal,
  ) { }

  cerrarModal() {
    this.activeModal.close();
  }

}
