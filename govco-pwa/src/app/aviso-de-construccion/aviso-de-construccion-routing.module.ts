import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { FooterComponent } from '../transversales/components/footer/footer.component';

const routes: Routes = [
  {
    path: 'transversales',
    children: [
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
export class AvisoDeConstruccionRoutingModule { }
