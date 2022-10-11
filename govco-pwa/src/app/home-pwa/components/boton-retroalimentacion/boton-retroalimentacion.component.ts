import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { ServiceAreaContentComponent } from './service-area-content/service-area-content.component';

@Component({
  selector: 'app-boton-retroalimentacion',
  templateUrl: './boton-retroalimentacion.component.html',
  styleUrls: ['./boton-retroalimentacion.component.scss'],
})
export class BotonRetroalimentacionComponent implements OnInit {
  constructor(private dialog: MatDialog) {}

  ngOnInit(): void {}

  openDialog() {
    const dialogRef = this.dialog.open(ServiceAreaContentComponent, {
      disableClose: true,
    });
  }
}
