import { CUSTOM_ELEMENTS_SCHEMA, NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { CategoriasRoutingModule } from './categorias-routing.module';
import { BreadcumbMomentosComponent } from './components/breadcumb-momentos/breadcumb-momentos.component';
import { CardCategoriasComponent } from './components/card-categorias/card-categorias.component';
import { DetalleMomentosComponent } from './components/detalle-momentos/detalle-momentos.component';
import { MomentosDeVidaComponent } from './components/momentos-de-vida/momentos-de-vida.component';
import { MaxContentPipe } from './pipes/max-content.pipe';
import { IconoPipePipe } from './pipes/icono-pipe.pipe';
import { TransversalesModule } from '../transversales/transversales.module';


@NgModule({
  declarations: [
    BreadcumbMomentosComponent,
    CardCategoriasComponent,
    DetalleMomentosComponent,
    MomentosDeVidaComponent,
    MaxContentPipe,
    IconoPipePipe,
  ],
  imports: [
    CommonModule,
    CategoriasRoutingModule,
    TransversalesModule
  ],
  exports: [
    CardCategoriasComponent,
    MomentosDeVidaComponent,
    MaxContentPipe,
    IconoPipePipe
  ],
  schemas:[CUSTOM_ELEMENTS_SCHEMA]
})
export class CategoriasModule { }
