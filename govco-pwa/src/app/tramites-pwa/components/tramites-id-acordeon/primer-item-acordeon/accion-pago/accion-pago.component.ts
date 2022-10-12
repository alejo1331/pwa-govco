import { Component, Input, OnInit } from '@angular/core';
import { AccionPago, DataAccionPago } from 'src/app/tramites-pwa/models/acordeon/acordeon-interface';
import { ValidateUrlService } from 'src/app/tramites-pwa/services/validate-url.service';

@Component({
  selector: 'app-accion-pago',
  templateUrl: './accion-pago.component.html',
  styleUrls: ['./accion-pago.component.scss']
})
export class AccionPagoComponent implements OnInit {

  @Input() data: AccionPago[];
  @Input() indexPago: number;
  
  public verMas = false;
  public dataFinal = [];
  public activeMas = false;

  constructor(
    public validateUrlService: ValidateUrlService
  ) { }

  ngOnInit(): void {
    this.data.forEach((value: AccionPago) => {
      if (value['data'].length > 0) {
        value['dataInicial'] = value['data'].slice(0, 5);
        value['dataFinal'] = [];
      }
      if (value['data'].length > 5) {
        this.activeMas = true;
      }
    });
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
