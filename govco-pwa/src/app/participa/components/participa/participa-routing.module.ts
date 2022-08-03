import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { ParticipaComponent } from './participa.component';


const routes: Routes = [
  {
    path: '', component: ParticipaComponent
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ParticipaRoutingModule { }

