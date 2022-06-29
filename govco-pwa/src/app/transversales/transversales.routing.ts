import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { SideNavComponent } from './components/side-nav/side-nav.component';
import { FooterComponent } from './components/footer/footer.component';

const routes: Routes = [
  {
    path: 'transversales',
    children: [
      {
        path: 'side-nav',
        component: SideNavComponent
      },
      {
        path: 'acerca-del-portal',
        component: FooterComponent
      }
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class TransversalesRoutingModule { }
export const ArrayOfComponents = [
]
