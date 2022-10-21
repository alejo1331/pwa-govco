import { Platform } from '@angular/cdk/platform';
import { Component, ElementRef, EventEmitter, Input, OnInit, Output, ViewChild } from '@angular/core';
import { InformacionModalInterface, ContenidoModalFiltroInterface } from '../../models/filtro-nivel-dos/filtro-nivel-dos-interface';

@Component({
  selector: 'app-modal-filtro-segundo-nivel',
  templateUrl: './modal-filtro-segundo-nivel.component.html',
  styleUrls: ['./modal-filtro-segundo-nivel.component.scss']
})
export class ModalFiltroSegundoNivelComponent implements OnInit {

  @ViewChild('modalFiltro') modalFiltro: ElementRef;
  @Input() informacionModal: InformacionModalInterface;
  @Output() itemSelected = new EventEmitter<ContenidoModalFiltroInterface>() ;

  idItemSelected: string | number;

  searchText: string = '';

  constructor(public platform: Platform) { }

  ngOnInit(): void {
  }

  abrirModal() {
    this.modalFiltro.nativeElement.classList.add('show');
    if (this.platform.IOS || this.platform.SAFARI) {
      var body = (document.getElementsByTagName('body') as HTMLCollectionOf<HTMLElement>)[0];
      body.style.position = 'fixed';
      body.style.overflow = 'hidden';
    }
  }

  itemSeleccionado(idItem: string | number, item: string) {
    this.idItemSelected = idItem;
    this.itemSelected.emit({idItem: idItem, item: item})
    this.modalFiltro.nativeElement.classList.remove('show');
    if (this.platform.IOS || this.platform.SAFARI) {
      var body = (document.getElementsByTagName('body') as HTMLCollectionOf<HTMLElement>)[0];
      body.style.removeProperty('position')
      body.style.removeProperty('overflow')
    }
  }

}
