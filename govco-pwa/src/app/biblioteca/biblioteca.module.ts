import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { BibliotecaRoutingModule } from './biblioteca-routing.module';
import { NgbModalModule, NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { FormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { CoreModule } from './core/core.module';


@NgModule({
  declarations: [
  ],
  imports: [
    BibliotecaRoutingModule,
    CommonModule,
    NgbModalModule, 
    NgbModule,
    FormsModule,
    RouterModule,
    CoreModule
  ],
  providers: [],
  entryComponents: [],
  exports: []
})
export class BibliotecaModule { }
