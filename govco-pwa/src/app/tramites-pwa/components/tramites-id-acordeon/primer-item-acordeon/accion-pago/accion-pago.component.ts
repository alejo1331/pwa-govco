import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'app-accion-pago',
  templateUrl: './accion-pago.component.html',
  styleUrls: ['./accion-pago.component.scss']
})
export class AccionPagoComponent implements OnInit {

  @Input() data: any;

  public items = [
    {
      active: false,
      titulo: 'Título #1 del acordeón',
      descripcion: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nam gravida.'
    }, 
    {
      active: false,
      titulo: 'Título #2 del acordeón',
      descripcion: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nam gravida.'
    },
    {
      active: false,
      titulo: 'Título #3 del acordeón',
      descripcion: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nam gravida.'
    }      
  ]
  
  public verMas = false;
  public dataFinal = [];

  constructor() { }

  ngOnInit(): void {
    this.data.forEach((value: any[]) => {
      if (value['data'].length > 0) {
        value['dataInicial'] = value['data'].slice(0, 5);
        value['dataFinal'] = [];
      }
    });
    console.log('data', this.data)
  }

  activarItem(index:number, dataItem:any) {
    dataItem[index].active = !dataItem[index].active;
    dataItem.forEach(function(item:any, indexItem:number){
      if (indexItem != index) {
        item.active = false;
      }
    });
  }

  verMasPagos(item:any, e:any) {
    if (item['data'].length > 0) {
      if (item['dataFinal'].length > 0) {
        item['dataFinal'] = [];
        e.target.textContent = 'Ver más';
      } else {
        item['dataFinal'] = item['data'].slice(5, item['data'].length);
        e.target.textContent = 'Ver menos';
      }
    }
  }

}
