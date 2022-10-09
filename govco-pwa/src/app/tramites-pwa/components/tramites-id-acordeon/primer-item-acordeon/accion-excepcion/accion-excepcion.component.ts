import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'app-accion-excepcion',
  templateUrl: './accion-excepcion.component.html',
  styleUrls: ['./accion-excepcion.component.scss']
})
export class AccionExcepcionComponent implements OnInit {

  @Input() data: any;

  constructor() { }

  ngOnInit(): void {
    console.log('data', this.data);
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
