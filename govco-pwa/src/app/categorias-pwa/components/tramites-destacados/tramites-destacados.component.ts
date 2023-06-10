import { Component, OnInit } from '@angular/core';
import { DetalleMomentosDeVidaService } from '../../services/detalle-momentos-de-vida/detalle-momentos-de-vida.service';

@Component({
  selector: 'app-tramites-destacados',
  templateUrl: './tramites-destacados.component.html',
  styleUrls: ['./tramites-destacados.component.scss']
})
export class TramitesDestacadosComponent implements OnInit {

  titulo: string = "";

  constructor(
    private serviceDetalleMomento: DetalleMomentosDeVidaService,
  ) { }

  ngOnInit() {
    this.titulo ='Trámites destacados';
    this.serviceDetalleMomento.setItemBarra(1);
  }

}
