import { Component, Input } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { ServiceAreaContentComponent } from './service-area-content/service-area-content.component';

@Component({
  selector: 'app-boton-retroalimentacion',
  templateUrl: './boton-retroalimentacion.component.html',
  styleUrls: ['./boton-retroalimentacion.component.scss'],
})
export class BotonRetroalimentacionComponent {
  @Input() position = false;
  dataModal: any;

  constructor(private dialog: MatDialog) {}

  openDialog() {
    if (this.position) {
      this.dataModal = {
        disableClose: true,
        panelClass: ['size-modal-retro', 'busqueda-modal'],
      };
    } else {
      this.dataModal = {
        disableClose: true,
        panelClass: 'size-modal-retro',
      };
    }
    const dialogRef = this.dialog.open(
      ServiceAreaContentComponent,
      this.dataModal
    );
  }
}
