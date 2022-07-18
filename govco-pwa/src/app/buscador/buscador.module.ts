import { CUSTOM_ELEMENTS_SCHEMA, NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { BuscadorRoutingModule } from './buscador-routing.module';
import { BuscadorHomeComponent } from './components/govco-buscador-home/govco-buscador-home.component';
import { BuscadorGeneralComponent } from './components/govco-buscador-general/govco-buscador-general.component';

@NgModule({
  imports: [
    CommonModule,
    BuscadorRoutingModule
  ],
  declarations: [BuscadorHomeComponent,
    BuscadorGeneralComponent],
  exports: [BuscadorHomeComponent,
    BuscadorGeneralComponent],
  schemas:[CUSTOM_ELEMENTS_SCHEMA]
})
export class BuscadorModule { }
