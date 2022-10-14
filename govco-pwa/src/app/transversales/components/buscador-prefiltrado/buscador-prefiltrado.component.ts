import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-buscador-prefiltrado',
  templateUrl: './buscador-prefiltrado.component.html',
  styleUrls: ['./buscador-prefiltrado.component.scss']
})
export class BuscadorPrefiltradoComponent implements OnInit {

  estadoBotonFiltro: boolean = true;
  tituloFiltro: string = '';

  constructor() { }

  ngOnInit(): void {
  }

  filtrarPor() {
    this.estadoBotonFiltro = !this.estadoBotonFiltro;
    let modal_prefiltrado: HTMLElement = document.getElementById('modal-prefiltrado') as HTMLElement;
    modal_prefiltrado.style.display = 'block';
  }

  itemSelected([item, estado]: [string, boolean]) {
    this.tituloFiltro = item;
    this.estadoBotonFiltro = estado;
    let modal_prefiltrado: HTMLElement = document.getElementById('modal-prefiltrado') as HTMLElement;
    modal_prefiltrado.addEventListener('transitionend', () => {
      this.estadoBotonFiltro == true ? modal_prefiltrado.style.display = 'none' : null;
    });
  }

}
