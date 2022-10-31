import { Component, OnInit } from '@angular/core';
import { BottomMenuService } from 'src/app/transversales/services/bottom-menu/bottom-menu.service';
import { Parametros } from '../../services/global';

@Component({
  selector: 'app-buscador-nivel-dos',
  templateUrl: './buscador-nivel-dos.component.html',
  styleUrls: ['./buscador-nivel-dos.component.scss'],
})
export class BuscadorNivelDosComponent implements OnInit {
  constructor(
    public bottomService: BottomMenuService,
  ) { }

  ngOnInit() {

  }

}
