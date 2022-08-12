import { CUSTOM_ELEMENTS_SCHEMA, NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { ParticipaRoutingModule } from './participa-routing.module';
import { ParticipaComponent } from './participa.component';

import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { SafePipe } from '../../pipes/safe.pipe';
import { SharedModule } from '../../shared/shared.module';
import { PaginationComponent } from '../../shared/pagination/pagination.component';
import { ModalSitioNoDisponibleComponent } from './modal-sitio-no-disponible/modal-sitio-no-disponible.component';
import { MatDialogModule } from '@angular/material/dialog';


@NgModule({
  declarations: [
    ParticipaComponent, 
    SafePipe,PaginationComponent,
    ModalSitioNoDisponibleComponent
  ],
  imports: [
    CommonModule,
    ParticipaRoutingModule,
    NgbModule,
    SharedModule,
    FormsModule,
    MatDialogModule
  ],
  schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class ParticipaModule { }
