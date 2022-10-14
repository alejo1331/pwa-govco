import { Component, EventEmitter, OnInit, Output } from '@angular/core';

@Component({
  selector: 'app-modal-prefiltrado',
  templateUrl: './modal-prefiltrado.component.html',
  styleUrls: ['./modal-prefiltrado.component.scss']
})
export class ModalPrefiltradoComponent implements OnInit {

  itemFiltro: number;
  @Output() itemSelected = new EventEmitter<[string, boolean]>();;

  constructor() { }

  ngOnInit(): void {
    this.itemFiltro = 0;
    this.itemSelected.emit(['Trámites',true])
  }

  seleccionarItem(item: string, posicion: number) {
    this.itemFiltro = posicion;
    this.itemSelected.emit([item,true]);
  }

}
