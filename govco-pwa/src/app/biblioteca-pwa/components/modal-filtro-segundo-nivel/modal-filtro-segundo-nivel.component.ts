import { Platform } from '@angular/cdk/platform';
import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';

@Component({
  selector: 'app-modal-filtro-segundo-nivel',
  templateUrl: './modal-filtro-segundo-nivel.component.html',
  styleUrls: ['./modal-filtro-segundo-nivel.component.scss']
})
export class ModalFiltroSegundoNivelComponent implements OnInit {

  @ViewChild('modalFiltro') modalFiltro: ElementRef;

  searchText: string = '';
  propiedad: { item: string, idItem: number | string }[];
  titulo: string = 'Categoría';
  itemSelected: string;
  contenidoBody: HTMLElement;
  alturaPantalla: number = 0;
  tamañoModal: number = 0;
  anchoPantalla: number = 0;

  constructor(public platform: Platform) { }

  ngOnInit(): void {
    this.propiedad = [
      { item: 'Artesanías', idItem: 0 },
      { item: 'Formación empresarial', idItem: 1 },
      { item: 'Industria y comercio', idItem: 2 },
      { item: 'Matricula empresa', idItem: 3 },
      { item: 'Artesanías colombiana', idItem: 4 },
      { item: 'Formación empresarial extranjera', idItem: 5 },
      { item: 'Industria y comercio mixta', idItem: 6 },
      { item: 'Inscripción casa de la cultura', idItem: 7 },
      { item: 'Matricula empresa publica', idItem: 8 },
      { item: 'Matricula empresa extranjera', idItem: 9 },
      { item: 'Formación empresarial privada', idItem: 10 },
    ];
  }

  abrirModal() {
    this.modalFiltro.nativeElement.classList.add('show');
    if (this.platform.IOS || this.platform.SAFARI) {
      var body = (document.getElementsByTagName('body') as HTMLCollectionOf<HTMLElement>)[0];
      body.style.position = 'fixed';
      body.style.overflow = 'hidden';
    }
  }

  itemSeleccionado(item: string) {
    this.itemSelected = item;
    this.modalFiltro.nativeElement.classList.remove('show');
    if (this.platform.IOS || this.platform.SAFARI) {
      var body = (document.getElementsByTagName('body') as HTMLCollectionOf<HTMLElement>)[0];
      body.style.removeProperty('position')
      body.style.removeProperty('overflow')
    }
  }

}
