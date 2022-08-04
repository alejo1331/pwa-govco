import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { SobreNosotrosComponent } from './components/sobre-nosotros/sobre-nosotros.component';

const routes: Routes = [
  {
    path: 'sobre-nosotros',
    children: [
      {
        path: '',
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
