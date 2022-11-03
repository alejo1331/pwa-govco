import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { Router } from '@angular/router';
import { BuscadorService, BuscadorParams } from 'src/app/buscador-pwa/services/buscador.service';

@Component({
  selector: 'app-buscador-prefiltrado',
  templateUrl: './buscador-prefiltrado.component.html',
  styleUrls: ['./buscador-prefiltrado.component.scss']
})
export class BuscadorPrefiltradoComponent implements OnInit {


  estadoBotonFiltro: boolean = true;
  tituloFiltro: string = '';
  abrirBuscadorCheck : boolean = false;

  constructor(
    private buscadorService : BuscadorService,
    private router: Router) { }

  ngOnInit(): void {

    let input : any = document.querySelector("input");
    // Suscribe para abrir el buscador
    this.buscadorService.getAbrirBuscador$.subscribe(
      (abrir : boolean) => {
        this.abrirBuscadorCheck = abrir
      })

      this.buscadorService.getBuscadorParams$.subscribe(
        (parametros : BuscadorParams) => {
          input.value = parametros.txtInputBuscador;
          this.tituloFiltro = parametros.txtConsumoApi;
          this.estadoBotonFiltro = true;
        })
  }

  filtrarPor() {
    this.estadoBotonFiltro = !this.estadoBotonFiltro;
    let modal_prefiltrado: HTMLElement = document.getElementById('modal-prefiltrado') as HTMLElement;
    modal_prefiltrado.style.display = 'block';
  }

  itemSelected([item, estado, index, txtConsumoApi]: [string, boolean, number, string]) {
    console.log('estado', estado)
    this.tituloFiltro = item;
    this.estadoBotonFiltro = estado;
    let modal_prefiltrado: HTMLElement = document.getElementById('modal-prefiltrado') as HTMLElement;
    modal_prefiltrado.addEventListener('transitionend', () => {
      this.estadoBotonFiltro == true ? modal_prefiltrado.style.display = 'none' : null;
    });
    // Actualización de los parametros de busqueda
    let input_buscador : any = document.getElementById('buscador-pwa-general') ;
    const buscadorParams : BuscadorParams = {
      index  : index,
      txtInputBuscador : input_buscador.value,
      txtConsumoApi : txtConsumoApi
    }
    this.buscadorService.setBuscadorParams(buscadorParams)
  }

  // Función de abrir el buscador
  abrirBuscadorPWA(){
    this.buscadorService.setAbrirBuscador(true)
  }
}
