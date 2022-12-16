import { Component, ElementRef, EventEmitter, OnInit, Output, ViewChild } from '@angular/core';
import { NavigationStart, Router, Event } from '@angular/router';
import { Subscription } from 'rxjs';
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
  estadoInicialInput = true;
  public itemsBuscador: ItemsInterface[];
  getParametros: Subscription
  inputBuscadorSegundoNivel: any
  posicion: number = 0;
  abrirBuscadorCheck: boolean = false;

  //Elementos clave para el focus del modal prefiltrado
  @ViewChild('botonPrefiltro') botonPrefiltro: ElementRef;
  @ViewChild('inputBuscador') inputBuscador: ElementRef;
  @ViewChild(ModalPrefiltradoComponent) componentPrefiltrado: ModalPrefiltradoComponent;
  @Output() estadoFocusFiltro = new EventEmitter<boolean>()

  constructor(
    private buscadorService: BuscadorService,
    private router: Router
  ) {
    router.events.subscribe((event: Event) => {
      if (event instanceof NavigationStart) {
        let regex = /([T][0-9])\w+/;
        if (event.url != '/buscador' && !event.url.includes('/ficha-tramites-y-servicios')) {
          if (!(regex.test(event.url) && event.url.includes('noticias/detalle'))) {
            this.inputBuscadorSegundoNivel = document.getElementById('buscador-pwa');
            if (this.inputBuscadorSegundoNivel) {
              this.inputBuscadorSegundoNivel.value = '';
            }
            this.buscadorService.setSugerenrciasBuscador([])
            this.estadoInicialInput = true;

            const i: number = 0;
            const buscadorParams: BuscadorParams = {
              index: ItemsBuscador[i].id,
              txtInputBuscador: '',
              txtConsumoApi: ItemsBuscador[i].txtConsumoApi,
              aplicaGeoreferenciacion: ItemsBuscador[i].aplicaGeoreferenciacion
            }
            this.buscadorService.setBuscadorParams(buscadorParams);
          }
        } else {
          this.estadoInicialInput = true
        }
      }
    })
  }

  ngOnInit(): void {
    this.itemsBuscador = ItemsBuscador;
    let input: any = document.querySelector("input");
    // Suscribe para abrir el buscador
    this.buscadorService.getAbrirBuscador$.subscribe(
      (abrir: boolean) => {
        this.abrirBuscadorCheck = abrir
      })

    this.getParametros = this.buscadorService.getBuscadorParams$.subscribe(
      (parametros: BuscadorParams) => {
        if (this.estadoInicialInput) {
          input.value = parametros.txtInputBuscador;
        }
        else {
          input.value = '';
        }
        this.tituloFiltro = parametros.txtConsumoApi;
        this.estadoBotonFiltro = false;
      })
  }

  filtrarPor() {
    this.estadoBotonFiltro = !this.estadoBotonFiltro;
    this.estadoFocusFiltro.emit(this.estadoBotonFiltro);
    this.estadoBotonFiltro ?
      this.componentPrefiltrado.abrirModal() : this.componentPrefiltrado.cerrarModal();
  }

  itemSelected([estado, index, abrirSelectorBusqueda, generarBusqueda]: [boolean, number, boolean, boolean]) {
    if (this.botonPrefiltro != undefined) {
      this.botonPrefiltro.nativeElement.focus();
    }
    if (this.componentPrefiltrado != undefined && abrirSelectorBusqueda) {
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
    if (generarBusqueda) {
      this.buscadorService.setBuscadorParams(buscadorParams);
    }
  }

  // Función de abrir el buscador
  abrirBuscadorPWA() {
    this.buscadorService.setAbrirBuscador(true)
  }

  ngOnDestroy(): void {
    if (this.getParametros) {
      const buscadorParams: BuscadorParams = {
        index: 0,
        txtInputBuscador: '',
        txtConsumoApi: 'tramite',
        aplicaGeoreferenciacion: 'no'
      }
      this.inputBuscadorSegundoNivel = document.getElementById('buscador-pwa');
      if (this.inputBuscadorSegundoNivel) {
        this.inputBuscadorSegundoNivel.value = '';
      }
      this.buscadorService.setBuscadorParams(buscadorParams)
      this.buscadorService.setSugerenrciasBuscador([])
      this.getParametros.unsubscribe();
    }
  }
}
