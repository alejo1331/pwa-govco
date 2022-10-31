import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { BuscadorService, BuscadorParams } from 'src/app/buscador-pwa/services/buscador.service';

@Component({
  selector: 'app-modal-prefiltrado',
  templateUrl: './modal-prefiltrado.component.html',
  styleUrls: ['./modal-prefiltrado.component.scss']
})
export class ModalPrefiltradoComponent implements OnInit {

  itemFiltro: number;
  @Output() itemSelected = new EventEmitter<[string, boolean, number,  string]>();;

  constructor(
    private buscadorService : BuscadorService
  ) { }

  ngOnInit(): void {
    this.itemFiltro = 0;
    this.itemSelected.emit(['Trámites',true, 0, 'tramite']);
    // Suscribe a los parametros de busqueda para actualizar el boton del filtro
    this.buscadorService.getBuscadorParams$.subscribe(
      (parametros : BuscadorParams) => {
        let elementoLista : any =  document.getElementsByClassName('item-filtro')[parametros.index]
        elementoLista.click()
      }
    )
  }

  seleccionarItem(item: string, posicion: number, txtConsumoApi:string ) {
    this.itemFiltro = posicion;
    this.itemSelected.emit([item,true, this.itemFiltro, txtConsumoApi ]);
  }

}
