import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatToolbarModule } from '@angular/material/toolbar';
import { SideNavComponent } from './side-nav/side-nav.component';
import { SideNavItemsComponent } from "./side-nav-items/side-nav-items.component";

@NgModule({
  imports: [
    CommonModule,
    MatToolbarModule,
  ],
  declarations: [SideNavComponent, SideNavItemsComponent],
  exports: [SideNavComponent, SideNavItemsComponent]
})
export class TransversalesModule { }
