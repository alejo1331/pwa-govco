import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { SobreNosotrosComponent } from './components/sobre-nosotros/sobre-nosotros.component';

const routes: Routes = [
  {
    path: 'menu',
    children: [
      {
        path: 'sobre-nosotros',
        component: SobreNosotrosComponent
      },
    ]
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class SobreNosotrosRoutingModule { }
