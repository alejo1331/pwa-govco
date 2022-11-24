import { Platform } from '@angular/cdk/platform';
import { Component, ElementRef, EventEmitter, Input, Output, ViewChild } from '@angular/core';
import { InformacionModalInterface } from '../../models/filtro-nivel-dos/filtro-nivel-dos-interface';


@Component({
  selector: 'app-modal-filtro-segundo-nivel',
  templateUrl: './modal-filtro-segundo-nivel.component.html',
  styleUrls: ['./modal-filtro-segundo-nivel.component.scss']
})
export class ModalFiltroSegundoNivelComponent {

  @ViewChild('modalFiltro') modalFiltro: ElementRef;
  @Input() informacionModal: InformacionModalInterface;
  @Output() itemSelected = new EventEmitter<string>();

  searchText: string = '';

  constructor(public platform: Platform) { }

  abrirModal() {
    this.modalFiltro.nativeElement.style.display = 'block';
    this.modalFiltro.nativeElement.classList.add('on-modal');
    this.modalFiltro.nativeElement.classList.remove('off-modal');
    if (this.platform.IOS || this.platform.SAFARI) {
      const body = (document.getElementsByTagName('body') as HTMLCollectionOf<HTMLElement>)[0];
      body.style.position = 'fixed';
      body.style.overflow = 'hidden';
    }
    this.focusInput();
    this.focus();
  }

  clickCerrarModal(event: Event) {
    if ((event.target as HTMLElement) === this.modalFiltro.nativeElement) {
      this.cerrarModal();
    }
  }

  cerrarModal() {
    this.modalFiltro.nativeElement.classList.remove('on-modal');
    this.modalFiltro.nativeElement.classList.add('off-modal');
  }

  onAnimationEnd(event: Event) {
    if ((event.target as HTMLElement).className == 'modal-filtro-pwa off-modal') {
      this.modalFiltro.nativeElement.removeAttribute('style');
    }
  }

  focusInput() {
    const input: HTMLElement = <HTMLElement>document.getElementById("search-text");
    input.focus();
  }

  itemSeleccionado(idItem: string | number, item: string) {
    this.itemSelected.emit(item)
    this.cerrarModal();
    if (this.platform.IOS || this.platform.SAFARI) {
      const body = (document.getElementsByTagName('body') as HTMLCollectionOf<HTMLElement>)[0];
      body.style.removeProperty('position')
      body.style.removeProperty('overflow')
    }
    this.removeFocus();
  }

  focus() {
    const currDialog = document.querySelector(".modal-filtro-pwa");

    if (currDialog) {
      const focusableElements = currDialog.querySelectorAll(
        'a[href], button, input, textarea, select, details, [tabindex]:not([tabindex="-1"])'
      );

      let first = <HTMLElement>focusableElements[0];
      let last = <HTMLElement>focusableElements[focusableElements.length - 1];

      $(document.body).on("focusin", (event) => {
        if (!currDialog.contains(event.target)) {
          event.preventDefault();
          event.stopPropagation();

          const previous = event.relatedTarget;

          if (previous == last) {
            first.focus();
          } else if (previous == first) {
            last.focus();
          }
        }
      });
    }
  }

  removeFocus() {
    document.body.removeEventListener("focus", () => { 
      // Remover focus
    });
  }

  ngOnDestroy() {
    this.removeFocus();
  }
}
