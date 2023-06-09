import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { FooterComponent } from './components/footer/footer.component';
import { CajaHerramientasComponent } from './components/caja-herramientas/caja-herramientas.component';
import { ServiciosParaEntidadesComponent } from './components/servicios-para-entidades/servicios-para-entidades.component';
import { LoginComponent } from './components/login/login.component';
import { RegistroComponent } from './components/registro/registro.component';
import { DatosUsuarioComponent } from './components/datos-usuario/datos-usuario.component';
import { LogoutComponent } from './components/logout/logout.component';
import { SigninOidcComponent } from './components/signin-oidc/signin-oidc.component';
import { PortalesComponent } from './components/portales/portales.component';
import { TerminosCondicionesComponent } from './components/terminos-condiciones/terminos-condiciones.component';


const routes: Routes = [
  { path: 'acerca-del-portal', component: FooterComponent },
  { path: 'servicios-para-entidades', component: ServiciosParaEntidadesComponent },
  { path: 'caja-de-herramientas', component: CajaHerramientasComponent },
  { path: 'login', component: LoginComponent},
  { path: 'registro', component: RegistroComponent},
  { path: 'logout', component: LogoutComponent},
  { path: 'datosusuario', component: DatosUsuarioComponent},
  { path: 'signin-oidc', component: SigninOidcComponent},
  { path: 'portales', component: PortalesComponent },
  { path: 'terminos-y-condiciones', component: TerminosCondicionesComponent },
];

@NgModule({
  imports: [
    RouterModule.forRoot(routes)
  ],

  exports: [RouterModule]
})
export class TransversalesRoutingModule { }
export const ArrayOfComponents = [
]
