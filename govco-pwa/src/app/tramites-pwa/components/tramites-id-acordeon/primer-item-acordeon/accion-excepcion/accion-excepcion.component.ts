import { Component, OnInit, Input } from '@angular/core';
import { AccionExcepcion } from 'src/app/tramites-pwa/models/acordeon/acordeon-interface';

@Component({
  selector: 'app-accion-excepcion',
  templateUrl: './accion-excepcion.component.html',
  styleUrls: ['./accion-excepcion.component.scss']
})
export class AccionExcepcionComponent implements OnInit {

  @Input() data: AccionExcepcion[];
  @Input() indexExcepcion: number;

  constructor() { }

  ngOnInit(): void {
  }

  activarItem(index:number) {
    this.data[index].active = !this.data[index].active;
    this.data.forEach(function(item:any, indexItem:number){
      if (indexItem != index) {
        item.active = false;
      }
    });
  }

}
