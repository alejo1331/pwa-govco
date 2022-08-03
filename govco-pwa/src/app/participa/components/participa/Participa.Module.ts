import { CUSTOM_ELEMENTS_SCHEMA, NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { ParticipaRoutingModule } from './participa-routing.module';

import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { PaginationComponent } from '../../shared/pagination/pagination.component';
import { SharedModule } from '../../shared/shared.module';
import { SafePipe } from '../../pipes/safe.pipe';
import { ParticipaComponent } from './participa.component';


@NgModule({
  declarations: [ParticipaComponent, SafePipe,PaginationComponent],
  imports: [
    CommonModule,
    ParticipaRoutingModule,
    NgbModule,
    SharedModule,
    FormsModule
  ],
  schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class ParticipaModule { }
