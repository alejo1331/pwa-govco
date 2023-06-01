import { Component, OnInit, ElementRef, ViewChild } from '@angular/core';
import { Platform } from '@angular/cdk/platform';

@Component({
  selector: 'app-filtros-primer-nivel',
  templateUrl: './filtros-primer-nivel.component.html',
  styleUrls: ['./filtros-primer-nivel.component.scss']
})
export class FiltrosPrimerNivelComponent implements OnInit {
  @ViewChild('modalFiltroNivel1') filtroPrimerNivel: ElementRef;

  constructor(
    public platform: Platform
  ) { }

  ngOnInit(): void {

    this.clickBackdrop();
    this.clickEscape();
  }

  abrirModal() {
    this.filtroPrimerNivel.nativeElement.classList.toggle('show');
    this.focus();
    if (this.platform.IOS || this.platform.SAFARI) {
      const body = (document.getElementsByTagName('body') as HTMLCollectionOf<HTMLElement>)[0];
      body.classList.toggle('contenido-body');
    }
  }

  focus() {
    const currDialog = document.querySelector(".container-filtros");

    if (currDialog) {
      const focusableElements = currDialog.querySelectorAll(
        'a[href], button, input, textarea, select, details, [tabindex]:not([tabindex="-1"])'
      );

      let first = <HTMLElement>focusableElements[0];
      let last = <HTMLElement>focusableElements[focusableElements.length - 1];

      $(document.body).on("focusin", (event) => {
        if (!currDialog.contains(<HTMLElement>event.target)) {
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

  clickBackdrop() {
    let th = this;
    $('.backdrop-filtros').on("click", function (event) {
      const container = $(".container-filtros");
      if ($(event.target).closest(container).length == 0 && !event.target.classList.contains('delete-selection')) {
        th.filtroPrimerNivel.nativeElement.classList.toggle('show');
        th.removerFocus();
        th.removeClassActiveFilter();
      }
    });
  }

  clickEscape() {
    document.addEventListener('keydown', (event) => {
      const modalFiltroSegundoNivel = document.querySelector('.modal-filtro-pwa')?.classList.contains('show');
      if (event.key == 'Escape' && !modalFiltroSegundoNivel) {
        this.filtroPrimerNivel.nativeElement.classList.remove('show');
        this.removerFocus();
        this.removeClassActiveFilter();
      }
    }, false);
  }

  removerFocus() {
    $(document.body).off("focusin");
  }

  removeClassActiveFilter() {
    const elementSubcategorias = document.querySelector('.govco-pwa-momentos-subcategorias');
    elementSubcategorias?.classList.remove('active-filter');
    const elementGeolocalizacion = document.querySelector('.barra-geolocalizacion-pwa-govco');
    elementGeolocalizacion?.classList.remove('active-filter-tramites');
    const elementHeaderGovco = document.querySelector('.govco-pwa-header');
    elementHeaderGovco?.classList.remove('hide');
    const elementContent = document.querySelector('.govco-pwa-content');
    elementContent?.classList.remove('active-filter-tramites');
    const elementBottomMenu = document.querySelector('.govco-pwa-bottom-menu');
    elementBottomMenu?.classList.remove('hide');
  }
}
