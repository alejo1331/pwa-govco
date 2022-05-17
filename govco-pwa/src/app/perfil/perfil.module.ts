import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { PerfilRoutingModule } from  './peril-routing.module';
import { PerfilHomeComponent } from './perfil-home/perfil-home.component';

@NgModule({
  imports: [
    CommonModule,
    PerfilRoutingModule
  ],
  declarations: [PerfilHomeComponent],
  exports: [PerfilHomeComponent],
})
export class PerfilModule { }
