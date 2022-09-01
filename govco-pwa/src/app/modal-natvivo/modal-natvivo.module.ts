import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ModalClasicoComponent } from './components/modal-clasico/modal-clasico.component';
import { ModalUnoComponent } from './components/modal-uno/modal-uno.component';
import { MatDialogModule } from '@angular/material/dialog';




@NgModule({
  declarations: [
    ModalClasicoComponent,
    ModalUnoComponent
  ],
  imports: [
    CommonModule,
    MatDialogModule
  ],
  exports: [
    ModalClasicoComponent,
    ModalUnoComponent
  ]
})
export class ModalNatvivoModule { }
