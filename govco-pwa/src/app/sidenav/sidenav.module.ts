import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SidenavItemsComponent } from './sidenav-items/sidenav-items.component';
import { MatSidenavModule } from '@angular/material/sidenav';

@NgModule({
  imports: [
    CommonModule,
    MatSidenavModule,
  ],
  declarations: [SidenavItemsComponent],
  exports:[SidenavItemsComponent]
})
export class SidenavModule { }
