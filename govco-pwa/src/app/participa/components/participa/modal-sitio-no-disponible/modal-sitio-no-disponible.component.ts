import { Component } from '@angular/core';
import { MatDialogRef } from '@angular/material/dialog';

@Component({
  selector: 'app-modal-sitio-no-disponible',
  templateUrl: './modal-sitio-no-disponible.component.html',
  styleUrls: ['./modal-sitio-no-disponible.component.scss']
})
export class ModalSitioNoDisponibleComponent {
  constructor(public dialogRef: MatDialogRef<ModalSitioNoDisponibleComponent>) { }  
}
