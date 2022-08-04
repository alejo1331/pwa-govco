import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ParticipaComponent } from './components/participa/participa.component';

const routes: Routes = [
  {
    path: 'participa',
    children: [
      {
        path: '',
        component: ParticipaComponent
      },
    ]
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ParticipaRoutingModule { }
