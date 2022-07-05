import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TramitesHomeComponent } from './components/tramites-home//tramites-home.component';
import { TramitesRoutingModule } from './tramites-routing.module';
import { AvisoDeConstruccionModule } from '../aviso-de-construccion/aviso-de-construccion.module';

@NgModule({
  imports: [
    CommonModule,
    AvisoDeConstruccionModule,
    TramitesRoutingModule
  ],
  declarations: [TramitesHomeComponent],
  exports:[TramitesHomeComponent]
})
export class TramitesModule { }
