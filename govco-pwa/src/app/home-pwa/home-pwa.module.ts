import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatButtonModule } from '@angular/material/button';
import { MatDialogModule } from '@angular/material/dialog';
import { FormsModule } from '@angular/forms';

import { HomePwaRoutingModule } from './home-pwa-routing.module';
import { HomePrincipalComponent } from './components/home-principal/home-principal.component';
import { SeccionActualidadComponent } from './components/seccion-actualidad/seccion-actualidad.component';
import { BibliotecaPwaModule } from '../biblioteca-pwa/biblioteca-pwa.module';
import { SeccionTemasInteresComponent } from './components/seccion-temas-interes/seccion-temas-interes.component';
import { BannerPrincipalPwaComponent } from './components/banner-principal-pwa/banner-principal-pwa.component';
import { BannerCardsComponent } from './components/banner-cards/banner-cards.component';
import { BannerCardComponent } from './components/banner-cards/banner-card/banner-card.component';
import { SeccionContactosEmerganciaComponent } from './components/seccion-contactos-emergancia/seccion-contactos-emergancia.component';
import { BotonRetroalimentacionComponent } from './components/boton-retroalimentacion/boton-retroalimentacion.component';
import { ServiceAreaContentComponent } from './components/boton-retroalimentacion/service-area-content/service-area-content.component';
import { SeccionCarpetaCiudadanaComponent } from './components/seccion-carpeta-ciudadana/seccion-carpeta-ciudadana.component';
import { FooterComponent } from '../biblioteca-pwa/components/footer/footer.component';
import { ModalAgradecimientoComponent } from './components/boton-retroalimentacion/modal-agradecimiento/modal-agradecimiento.component';

@NgModule({
  declarations: [
    HomePrincipalComponent,
    SeccionActualidadComponent,
    SeccionTemasInteresComponent,
    BannerPrincipalPwaComponent,
    BannerCardsComponent,
    BannerCardComponent,
    SeccionContactosEmerganciaComponent,
    BotonRetroalimentacionComponent,
    ServiceAreaContentComponent,
    SeccionCarpetaCiudadanaComponent,
    FooterComponent,
    ModalAgradecimientoComponent,
  ],
  imports: [
    CommonModule,
    HomePwaRoutingModule,
    BibliotecaPwaModule,
    MatButtonModule,
    MatDialogModule,
    FormsModule,
  ],
})
export class HomePwaModule {}
