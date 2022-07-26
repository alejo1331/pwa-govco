import { Component, OnInit } from '@angular/core';
import { MatDialogRef } from '@angular/material/dialog';

@Component({
  selector: 'app-confirmacion-ubicacion',
  templateUrl: './confirmacion-ubicacion.component.html',
  styleUrls: ['./confirmacion-ubicacion.component.css']
})
export class ConfirmacionUbicacionComponent  {
  constructor(public dialogRef: MatDialogRef<ConfirmacionUbicacionComponent>) { }  
}
