import { Component, OnInit, Input } from '@angular/core';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';

@Component({
  selector: 'app-modal-dudas-pwa',
  templateUrl: './modal-dudas-pwa.component.html',
  styleUrls: ['./modal-dudas-pwa.component.scss'],
})
export class ModalDudasPwaComponent implements OnInit {
  @Input() canalesSeguimiento: any;
  listaEmail: string[];
  listaNumeros: string[];

  constructor(public activeModal: NgbActiveModal) {}

  ngOnInit(): void {
    if (this.canalesSeguimiento.length === 1) {
      this.listaEmail = this.canalesSeguimiento
        .map((data: any) => data.Correo)
        .filter(Boolean);
      this.listaNumeros = this.canalesSeguimiento
        .map((data: any) => data.Telefono)
        .filter(Boolean);
    } else {
      let listaEmailFilter = new Set(
        this.canalesSeguimiento
          .filter((data: any) => data.Canal === 'CORREO')
          .map((data: any) => data.Correo)
          .filter(Boolean)
      );
      this.listaEmail = [...listaEmailFilter] as string[];
      let listaNumerosFilter = new Set(
        this.canalesSeguimiento
          .filter((data: any) => data.Canal === 'TELEFONICO')
          .map((data: any) => data.Telefono)
          .filter(Boolean)
      );
      this.listaNumeros = [...listaNumerosFilter] as string[];
    }
  }
}
