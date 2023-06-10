import { Component, OnInit } from '@angular/core';
import { DetalleMomentosDeVidaService } from '../../services/detalle-momentos-de-vida/detalle-momentos-de-vida.service';

@Component({
  selector: 'app-actualidad',
  templateUrl: './actualidad.component.html',
  styleUrls: ['./actualidad.component.scss']
})
export class ActualidadComponent implements OnInit {

  public data_actualidad: data_actualidad[];

  constructor(
    private serviceDetalleMomento: DetalleMomentosDeVidaService,
  ) { }

  ngOnInit() {
    this.serviceDetalleMomento.setItemBarra(3);
  }

}

export interface data_actualidad {

}
