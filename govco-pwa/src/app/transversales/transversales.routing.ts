import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { SideNavComponent } from './side-nav/side-nav.component';
import { SideNavItemsComponent } from "./side-nav-items/side-nav-items.component";

const routes: Routes = [{
  path: 'perfil',
  children: [

    {
      path: 'side-nav',
      component: SideNavComponent
    },
  ]
}];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class PerfilRoutingModule { }
