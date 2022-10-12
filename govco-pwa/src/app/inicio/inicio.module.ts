import { CUSTOM_ELEMENTS_SCHEMA, NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HomeComponent } from './components/home/home.component';
import { InicioRoutingModule } from './inicio-routing.module';
import { AvisoDeConstruccionModule } from '../aviso-de-construccion/aviso-de-construccion.module';
import { MenuContextualComponent } from './components/menu-contextual/menu-contextual.component';
import { BannerPrincipalComponent } from './components/banner-principal/banner-principal.component';
import { ContactosDeEmergenciaComponent } from './components/contactos-de-emergencia/contactos-de-emergencia.component';
import { CarpetaCiudadanaComponent } from './components/carpeta-ciudadana/carpeta-ciudadana.component';
import { PortalesComponent } from './components/portales/portales.component';
import { NgxPaginationModule } from 'ngx-pagination';
import { FormsModule } from '@angular/forms';


@NgModule({
  imports: [
    CommonModule,
    AvisoDeConstruccionModule,
    InicioRoutingModule,
    NgxPaginationModule,
    FormsModule
  ],
  declarations: [
    HomeComponent, 
    MenuContextualComponent, 
    BannerPrincipalComponent, 
    ContactosDeEmergenciaComponent, 
    CarpetaCiudadanaComponent, PortalesComponent
  ],
  exports: [HomeComponent],
  schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class InicioModule { }
