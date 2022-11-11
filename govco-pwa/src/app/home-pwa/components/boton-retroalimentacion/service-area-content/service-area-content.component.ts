import { Component } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { ModalAgradecimientoComponent } from './../modal-agradecimiento/modal-agradecimiento.component';

@Component({
  selector: 'app-service-area-content',
  templateUrl: './service-area-content.component.html',
  styleUrls: ['./service-area-content.component.scss'],
})
export class ServiceAreaContentComponent {
  selectedY: boolean = false;
  selectedN: boolean = false;
  textLarge = '';

  constructor(private dialog: MatDialog) {}


  selectedOption(value: string) {
    if (
      (value === 'Y' && this.selectedY === false && this.selectedN === false) ||
      (value === 'Y' && this.selectedY === false && this.selectedN === true)
    ) {
      this.selectedY = true;
      this.selectedN = false;
      document
        .querySelector('.selectionY')
        ?.classList.add('background-selection');
      document
        .querySelector('.selectionN')
        ?.classList.remove('background-selection');
    } else if (
      (value === 'N' && this.selectedY === false && this.selectedN === false) ||
      (value === 'N' && this.selectedY === true && this.selectedN === false)
    ) {
      this.selectedN = true;
      this.selectedY = false;
      document
        .querySelector('.selectionN')
        ?.classList.add('background-selection');
      document
        .querySelector('.selectionY')
        ?.classList.remove('background-selection');
    }
  }

  openDialog() {
    const dialogRef = this.dialog.open(ModalAgradecimientoComponent, {
      disableClose: true,
      panelClass: 'size-modal',
    });
  }
}
