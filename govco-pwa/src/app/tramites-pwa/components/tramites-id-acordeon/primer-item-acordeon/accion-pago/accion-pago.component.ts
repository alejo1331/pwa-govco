import { Component, Input, OnInit } from '@angular/core';
import { AccionPago } from 'src/app/tramites-pwa/models/acordeon/acordeon-interface';
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
    
    if (dataItem[index].active) {
      this.onClickItem(index > 0 ? ('hrItemPago' + (index-1)) : 'item' + this.indexPago);
    }
  }

  onClickItem(item: any) {
    setTimeout(()=>{
      document.getElementById(item)?.scrollIntoView({block: "start", behavior: "smooth"});
    }, 350)
  }

  verMasPagos(item:any, e:any) {
    if (item['data'].length > 0) {
      if (item['dataInicial'].length < item['data'].length) {

        const element:HTMLElement = <HTMLElement>document.querySelector('[aria-controls="collapsePago' + (item['dataInicial'].length-1) + '"]');
        element.focus();

        item['dataInicial'] = item['data'].slice(0, item['dataInicial'].length + 5);
        
        if (item['dataInicial'].length == item['data'].length) {
          e.target.textContent = 'Ver menos';
        }
      } else {
        item['dataInicial'] = item['data'].slice(0, 5);
        e.target.textContent = 'Ver más';
        
        const element:HTMLElement = <HTMLElement>document.querySelector('[aria-controls="collapsePago0"]');
        element.focus();
      }
    }
  }
}
