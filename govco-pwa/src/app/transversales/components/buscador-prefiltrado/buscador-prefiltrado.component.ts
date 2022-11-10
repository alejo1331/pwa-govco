import { Component, ElementRef, EventEmitter, OnInit, Output, ViewChild } from '@angular/core';
import { BuscadorService, BuscadorParams } from 'src/app/buscador-pwa/services/buscador.service';
import { ItemsBuscador } from 'src/variables-globales/items-buscador';
import { ItemsInterface } from '../../models/bucador-pwa/items-interface';
import { ModalPrefiltradoComponent } from './modal-prefiltrado/modal-prefiltrado.component'

@Component({
  selector: 'app-buscador-prefiltrado',
  templateUrl: './buscador-prefiltrado.component.html',
  styleUrls: ['./buscador-prefiltrado.component.scss']
})
export class BuscadorPrefiltradoComponent implements OnInit {

  estadoBotonFiltro: boolean = false;
  tituloFiltro: string = '';
  public itemsBuscador : ItemsInterface[];

  posicion: number = 0;
  abrirBuscadorCheck: boolean = false;

  //Elementos clave para el focus del modal prefiltrado
  @ViewChild('botonPrefiltro') botonPrefiltro: ElementRef;
  @ViewChild('inputBuscador') inputBuscador: ElementRef;
  @ViewChild(ModalPrefiltradoComponent) componentPrefiltrado: ModalPrefiltradoComponent;
  @Output() estadoFocusFiltro = new EventEmitter<boolean>()

  constructor(private buscadorService: BuscadorService) { }

  ngOnInit(): void {
    this.itemsBuscador = ItemsBuscador;
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

  itemSelected([estado, index]: [boolean, number]) {
    this.botonPrefiltro != undefined ? this.botonPrefiltro.nativeElement.focus() : null;
    if (this.componentPrefiltrado != undefined) {
      this.filtrarPor();
    }
    this.posicion = index;
    this.tituloFiltro = ItemsBuscador[index].txtConsumoApi;
    this.estadoBotonFiltro = estado;
    // Actualización de los parametros de busqueda
    let input_buscador: any = document.getElementById('buscador-pwa-general');
    const buscadorParams: BuscadorParams = {
      index: index,
      txtInputBuscador: input_buscador.value,
      txtConsumoApi: ItemsBuscador[index].txtConsumoApi,
      aplicaGeoreferenciacion: ItemsBuscador[index].aplicaGeoreferenciacion
    }
    this.buscadorService.setBuscadorParams(buscadorParams)
  }

  // Función de abrir el buscador
  abrirBuscadorPWA() {
    this.buscadorService.setAbrirBuscador(true)
  }
}
