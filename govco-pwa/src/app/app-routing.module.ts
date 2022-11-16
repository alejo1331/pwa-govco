import {  NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomePrincipalComponent } from './home-pwa/components/home-principal/home-principal.component';
// import { HomeComponent } from './inicio/components/home/home.component';


const routes: Routes = [
  // { path: '', component: HomeComponent },
  { path: '', component: HomePrincipalComponent },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],

})
export class AppRoutingModule { }


