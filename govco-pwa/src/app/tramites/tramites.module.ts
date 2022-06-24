import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TramitesHomeComponent } from './components/tramites-home//tramites-home.component';
import { TramitesRoutingModule } from './tramites-routing.module';

@NgModule({
  imports: [
    CommonModule,
    TramitesRoutingModule
  ],
  declarations: [TramitesHomeComponent],
  exports:[TramitesHomeComponent]
})
export class TramitesModule { }
