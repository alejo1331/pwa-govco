import { Component, OnInit } from '@angular/core';
import { BottomMenuService } from '../../services/bottom-menu/bottom-menu.service';

@Component({
  selector: 'app-buscador',
  templateUrl: './buscador.component.html',
  styleUrls: ['./buscador.component.css']
})
export class BuscadorComponent implements OnInit {
  bottomService: BottomMenuService;

  ngOnInit(): void {
    this.bottomService.ajustandoPantalla(false);
  }

}
