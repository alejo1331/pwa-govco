import { Component, Input } from '@angular/core';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';

@Component({
  selector: 'app-modal-informativo',
  templateUrl: './modal-informativo.component.html',
  styleUrls: ['./modal-informativo.component.scss']
})
export class ModalInformativoComponent {

  @Input() data: any;

  constructor(
    public activeModal: NgbActiveModal,
  ) { }


}
