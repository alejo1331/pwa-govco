import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HomeComponent } from './components/home/home.component';
import { TramitesRoutingModule } from './tramites-routing.module';

@NgModule({
  imports: [
    CommonModule,
    TramitesRoutingModule
  ],
  declarations: [HomeComponent],
  exports:[HomeComponent]
})
export class TramitesModule { }
