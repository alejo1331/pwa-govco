import { CUSTOM_ELEMENTS_SCHEMA, NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { CategoriasRoutingModule } from './categorias-routing.module';
import { BreadcumbMomentosComponent } from './components/breadcumb-momentos/breadcumb-momentos.component';
import { CardCategoriasComponent } from './components/card-categorias/card-categorias.component';
import { DetalleMomentosComponent } from './components/detalle-momentos/detalle-momentos.component';
import { MomentosDeVidaComponent } from './components/momentos-de-vida/momentos-de-vida.component';
import { TransversalesModule } from '../transversales/transversales.module';
import { PipesModule } from '../pipes/pipes.module';


@NgModule({
  declarations: [
    BreadcumbMomentosComponent,
    CardCategoriasComponent,
    DetalleMomentosComponent,
    MomentosDeVidaComponent
  ],
  imports: [
    CommonModule,
    CategoriasRoutingModule,
    TransversalesModule,
    PipesModule
  ],
  exports: [
    CardCategoriasComponent,
    MomentosDeVidaComponent
  ],
  schemas:[CUSTOM_ELEMENTS_SCHEMA]
})
export class CategoriasModule { }
