import { Component, OnInit } from '@angular/core';
import { MatDialogRef } from '@angular/material/dialog';

@Component({
  selector: 'app-modal-error-url',
  templateUrl: './modal-error-url.component.html',
  styleUrls: ['./modal-error-url.component.scss']
})
export class ModalErrorUrlComponent implements OnInit {

  constructor(
    public dialogRef: MatDialogRef<ModalErrorUrlComponent>,
  ) {
   }

  ngOnInit(): void {
  }

}
