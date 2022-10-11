import { Component, OnInit, Input } from '@angular/core';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';

@Component({
  selector: 'app-modal-dudas-pwa',
  templateUrl: './modal-dudas-pwa.component.html',
  styleUrls: ['./modal-dudas-pwa.component.scss'],
})
export class ModalDudasPwaComponent implements OnInit {
  @Input() canalesSeguimiento: any;

  constructor(public activeModal: NgbActiveModal) {}

  ngOnInit(): void {}
}
