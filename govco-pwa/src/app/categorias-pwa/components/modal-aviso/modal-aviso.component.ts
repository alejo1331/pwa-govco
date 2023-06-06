import { Component, OnInit, ViewChild, ElementRef, Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'app-modal-aviso',
  templateUrl: './modal-aviso.component.html',
  styleUrls: ['./modal-aviso.component.scss']
})
export class ModalAvisoComponent implements OnInit {

  @Output() closedModal = new EventEmitter<[string, string]>();
  @ViewChild('botonAtras') botonAtras: ElementRef;
  cerrarModal: [string, string];

  constructor() { }

  ngOnInit(): void {
    this.cerrarModal = ["translate(100%)", 'translate(0%)'];
  }

  closedAviso() {
    this.closedModal.emit(this.cerrarModal);
  }

}
