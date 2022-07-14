import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HomeComponent } from './components/home/home.component';
import { InicioRoutingModule } from './inicio-routing.module';
import { AvisoDeConstruccionModule } from '../aviso-de-construccion/aviso-de-construccion.module';
import { MenuContextualComponent } from './components/menu-contextual/menu-contextual.component';
import { BannerPrincipalComponent } from './components/banner-principal/banner-principal.component';
import { ContactosDeEmergenciaComponent } from './components/contactos-de-emergencia/contactos-de-emergencia.component';

@NgModule({
  imports: [
    CommonModule,
    AvisoDeConstruccionModule,
    InicioRoutingModule
  ],
  declarations: [
    HomeComponent, 
    MenuContextualComponent, 
    BannerPrincipalComponent, 
    ContactosDeEmergenciaComponent
  ],
  exports: [HomeComponent],
})
export class InicioModule { }
