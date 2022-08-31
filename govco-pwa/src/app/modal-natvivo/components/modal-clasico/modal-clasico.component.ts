import { Component, OnInit } from '@angular/core';
import { MatDialogRef } from '@angular/material/dialog';
import { ModalInterface } from '../../models/modal-interface';
import { ModalService } from '../../services/modal.service';

@Component({
  selector: 'app-modal-clasico',
  templateUrl: './modal-clasico.component.html',
  styleUrls: ['./modal-clasico.component.css']
})
export class ModalClasicoComponent implements OnInit {

  campoTitulo: string;
  campoTexto: string;
  botonCancelar: string;
  botonAceptar: string;

  constructor(
    public dialogRef: MatDialogRef<ModalClasicoComponent>,
    protected modalService: ModalService
  ) { 
    dialogRef.disableClose = true;
  }

  ngOnInit(): void {
    this.modalService.modalClasico.subscribe((data: ModalInterface) => {
      this.campoTitulo = data.campoTitulo;
      this.campoTexto = data.campoTexto;
      this.botonCancelar = data.botonCancelar;
      this.botonAceptar = data.botonAceptar;
    })
  }

}
