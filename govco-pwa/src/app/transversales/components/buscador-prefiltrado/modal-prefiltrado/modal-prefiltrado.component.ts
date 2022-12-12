import { Component, ElementRef, EventEmitter, OnInit, Output, QueryList, ViewChild, ViewChildren } from '@angular/core';
import { BuscadorService, BuscadorParams } from 'src/app/buscador-pwa/services/buscador.service';
import { BuscadorPrefiltradoComponent } from '../buscador-prefiltrado.component';

@Component({
  selector: 'app-modal-prefiltrado',
  templateUrl: './modal-prefiltrado.component.html',
  styleUrls: ['./modal-prefiltrado.component.scss']
})
export class ModalPrefiltradoComponent implements OnInit {

  itemFiltro: number;
  @Output() itemSelected = new EventEmitter<[ boolean, number, boolean, boolean]>();
  @ViewChildren('listaPrefiltro', { read: ElementRef }) listaPrefiltro: QueryList<ElementRef>
  @ViewChild('modal') modal: ElementRef;

  txtLargo: string[] = ['Trámites y servicios', 'Entidades', 'Noticias', 'Ejercicios de participación', 'Ventanillas Únicas', 'Portales Transversales'];
  reiniciarFocus: boolean = false;

  constructor(
    private buscadorService: BuscadorService,
    private buscadorPrefiltrado: BuscadorPrefiltradoComponent
  ) { }

  ngOnInit(): void {
    this.itemFiltro = 0;
    this.itemSelected.emit([false, 0, true, true]);
    // Suscribe a los parametros de busqueda para actualizar el boton del filtro
    this.buscadorService.getBuscadorParams$.subscribe(
      (parametros: BuscadorParams) => {
        if(this.itemFiltro != parametros.index){
          this.itemFiltro = parametros.index;
          this.itemSelected.emit([false, this.itemFiltro, false, false]);
        }
      }
    )
  }

  seleccionarItem(posicion: number) {
    this.itemFiltro = posicion;
    this.itemSelected.emit([false, posicion, true, true]);
  }

  focusBuscador() {
    this.buscadorPrefiltrado.inputBuscador.nativeElement.focus();
    this.reiniciarFocus = false;
  }

  abrirModal() {
    this.modal.nativeElement.style.display = 'block';
    this.modal.nativeElement.classList.add('on-modal');
    this.modal.nativeElement.classList.remove('off-modal');
  }

  cerrarModal() {
    this.modal.nativeElement.classList.remove('on-modal');
    this.modal.nativeElement.classList.add('off-modal');
  }

  onAnimationEnd(event: Event) {
    if ((event.target as HTMLElement).className == 'contenido-modal-pwa off-modal') {
      this.modal.nativeElement.removeAttribute('style');
    }
  }

  onKeyDown(event: KeyboardEvent) {
    if (event.key == 'Tab') {
      if (this.reiniciarFocus == true) {
        this.focusBuscador();
      }
    } else if (event.key == 'Escape') {
      this.cerrarModal();
      this.buscadorPrefiltrado.botonPrefiltro.nativeElement.focus();
      this.buscadorPrefiltrado.filtrarPor();
    }
  }

  onFocusLi(event: Event) {
    if (this.listaPrefiltro.toArray()[this.txtLargo.length - 1].nativeElement == event.target) {
      this.reiniciarFocus = true;
    }
  }
}
