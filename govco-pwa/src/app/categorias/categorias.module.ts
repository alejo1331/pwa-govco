import { CUSTOM_ELEMENTS_SCHEMA, NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { CategoriasRoutingModule } from './categorias-routing.module';
import { BannerDetalleComponent } from './components/banner-detalle/banner-detalle.component';
import { BannerPrincipalComponent } from './components/banner-principal/banner-principal.component';
import { BreadcumbMomentosComponent } from './components/breadcumb-momentos/breadcumb-momentos.component';
import { BreadcumbsComponent } from './components/breadcumbs/breadcumbs.component';
import { CardCategoriasComponent } from './components/card-categorias/card-categorias.component';
import { DetalleMomentosComponent } from './components/detalle-momentos/detalle-momentos.component';
import { MomentosDeVidaComponent } from './components/momentos-de-vida/momentos-de-vida.component';
import { MaxContentPipe } from './pipes/max-content.pipe';
import { IconoPipePipe } from './pipes/icono-pipe.pipe';


@NgModule({
  declarations: [
    BannerDetalleComponent,
    BannerPrincipalComponent,
    BreadcumbMomentosComponent,
    BreadcumbsComponent,
    CardCategoriasComponent,
    DetalleMomentosComponent,
    MomentosDeVidaComponent,
    MaxContentPipe,
    IconoPipePipe,
  ],
  imports: [
    CommonModule,
    CategoriasRoutingModule
  ],
  exports: [
    CardCategoriasComponent,
    MomentosDeVidaComponent
  ],
  schemas:[CUSTOM_ELEMENTS_SCHEMA]
})
export class CategoriasModule { }
