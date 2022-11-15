import { Component, Input } from '@angular/core';
import { BottomMenuService } from 'src/app/transversales/services/bottom-menu/bottom-menu.service';

@Component({
  selector: 'app-buscador-nivel-dos',
  templateUrl: './buscador-nivel-dos.component.html',
  styleUrls: ['./buscador-nivel-dos.component.scss'],
})
export class BuscadorNivelDosComponent {

  @Input() activarServicio: boolean;

  constructor(
    public bottomService: BottomMenuService,
  ) { }

}
