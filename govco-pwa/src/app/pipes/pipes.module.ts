import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MaxContentPipe } from './max-content/max-content.pipe';
import { IconoPipePipe } from './icono-pipe/icono-pipe.pipe';



@NgModule({
  declarations: [
    MaxContentPipe,
    IconoPipePipe
  ],
  imports: [
    CommonModule
  ],
  exports: [
    MaxContentPipe,
    IconoPipePipe
  ]
})
export class PipesModule { }
