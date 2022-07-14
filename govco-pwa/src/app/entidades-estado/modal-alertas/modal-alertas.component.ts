import { Component, Input, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';

@Component({
  selector: 'app-modal-alertas',
  templateUrl: './modal-alertas.component.html',
  styleUrls: ['./modal-alertas.component.scss']
})
export class ModalAlertasComponent implements OnInit {

  @Input() entidad: any;
  @Input() linkUrl: any;

  constructor(
    public activeModal: NgbActiveModal,
    private router: Router
  ) { }

  ngOnInit(): void {

  }

  cerrarModal() {
    this.activeModal.close();
  }

}
