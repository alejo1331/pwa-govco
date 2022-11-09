import { Component, ElementRef, EventEmitter, OnInit, Output, ViewChild } from '@angular/core';
import { BuscadorService, BuscadorParams } from 'src/app/buscador-pwa/services/buscador.service';
import { ModalPrefiltradoComponent } from './modal-prefiltrado/modal-prefiltrado.component'

@Component({
  selector: 'app-buscador-prefiltrado',
  templateUrl: './buscador-prefiltrado.component.html',
  styleUrls: ['./buscador-prefiltrado.component.scss']
})
export class BuscadorPrefiltradoComponent implements OnInit {

  estadoBotonFiltro: boolean = false;
  tituloFiltro: string = '';
  titleSeccion: Array<String> = ['Trámites', 'Entidades', 'Noticias', 'Ejercicios', 'Ventanillas', 'Portales'];
  posicion: number;
  abrirBuscadorCheck: boolean = false;

  //Elementos clave para el focus del modal prefiltrado
  @ViewChild('botonPrefiltro') botonPrefiltro: ElementRef;
  @ViewChild('inputBuscador') inputBuscador: ElementRef;
  @ViewChild(ModalPrefiltradoComponent) componentPrefiltrado: ModalPrefiltradoComponent;
  @Output() estadoFocusFiltro = new EventEmitter<boolean>()

  constructor(private buscadorService: BuscadorService) { }

  ngOnInit(): void {

    let input: any = document.querySelector("input");
    // Suscribe para abrir el buscador
    this.buscadorService.getAbrirBuscador$.subscribe(
      (abrir: boolean) => {
        this.abrirBuscadorCheck = abrir
      })

    this.buscadorService.getBuscadorParams$.subscribe(
      (parametros: BuscadorParams) => {
        input.value = parametros.txtInputBuscador;
        this.tituloFiltro = parametros.txtConsumoApi;
        this.estadoBotonFiltro = false;
      })
  }

  filtrarPor() {
    this.estadoBotonFiltro = !this.estadoBotonFiltro;
    this.estadoFocusFiltro.emit(this.estadoBotonFiltro);
    this.estadoBotonFiltro == true ?
      this.componentPrefiltrado.abrirModal() : this.componentPrefiltrado.cerrarModal();
  }

  itemSelected([item, estado, index, txtConsumoApi]: [string, boolean, number, string]) {
    this.botonPrefiltro != undefined ? this.botonPrefiltro.nativeElement.focus() : null;
    if (this.componentPrefiltrado != undefined) {
      this.filtrarPor();
    }
    this.posicion = index;
    this.tituloFiltro = item;
    this.estadoBotonFiltro = estado;
    // Actualización de los parametros de busqueda
    let input_buscador: any = document.getElementById('buscador-pwa-general');
    const buscadorParams: BuscadorParams = {
      index: index,
      txtInputBuscador: input_buscador.value,
      txtConsumoApi: txtConsumoApi
    }
    this.buscadorService.setBuscadorParams(buscadorParams)
  }

  // Función de abrir el buscador
  abrirBuscadorPWA() {
    this.buscadorService.setAbrirBuscador(true)
  }
}
