import { Component, OnInit, ElementRef, ViewChild } from '@angular/core';
import { Platform } from '@angular/cdk/platform';
import { ModalFiltroSegundoNivelComponent } from 'src/app/biblioteca-pwa/components/modal-filtro-segundo-nivel/modal-filtro-segundo-nivel.component';
import { InformacionModalInterface } from 'src/app/biblioteca-pwa/models/filtro-nivel-dos/filtro-nivel-dos-interface';

@Component({
  selector: 'app-filtros-primer-nivel',
  templateUrl: './filtros-primer-nivel.component.html',
  styleUrls: ['./filtros-primer-nivel.component.scss']
})
export class FiltrosPrimerNivelComponent implements OnInit {
  @ViewChild('modalFiltroNivel1') filtroPrimerNivel: ElementRef;  
  @ViewChild(ModalFiltroSegundoNivelComponent) ModalFiltroSegundoNivelComponent: ModalFiltroSegundoNivelComponent;
  informacionModalFiltro: InformacionModalInterface;

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
    const elementModal = document.querySelector('.modal-desplegable-pwa');
    elementModal?.classList.remove('backdrop-active-filter-tramites');
  }

  seleccionaFiltroNivelUno(idFiltro: string, tituloFiltro: string, event: any) {
    if (event.target.classList.contains('infoBoton') || event.target.classList.contains('info') || event.target.classList.contains('delete-selection')) {
      return false;
    }

    //inicia el servicio para el filtro de segundo nivel
    this.informacionModalFiltro = {
      titulo: "Entidad",
      contendioModal: [
          "Administradora colombiana de pensiones",
          "Alcaldía de dosquebradas",
          "Alcaldía de ibague",
          "Alcaldía de marinilla",
          "Alcaldía de neiva",
          "Alcaldía de pacho",
          "Alcaldía de pasto",
          "Alcaldía de piendamó",
          "Alcaldía de popayán",
          "Alcaldía de santiago de cali",
          "Alcaldía de tumaco",
          "Alcaldía de villanueva - casanare",
          "Alcaldía de yopal",
          "Alcaldía distrital de barranquilla,distrito especial,industrial y portuario",
          "Alcaldía distrital de cartagena de indias distrito turistico,historico y cultural",
          "Direccion de transito y transporte - floridablanca",
          "Ejercito nacional de colombia 1",
          "Gobernación archipiélago de san andrés,providencia y santa catalina",
          "Gobernación de casanare",
          "Gobernación de cundinamarca",
          "Gobernación de norte de santander",
          "Gobernación de putumayo",
          "Gobernación de tolima",
          "Inspeccion de transito y transporte de barrancabermeja",
          "Instituto de movilidad de pereira",
          "Instituto de transito del atlantico",
          "Instituto de transito y transporte de charalá",
          "Instituto de tránsito y transporte de pitalito",
          "Instituto departamental de transito del quindio",
          "Instituto departamental de transito y transporte del meta",
          "Instituto municipal de transportes y transito de corozal",
          "Registraduria nacional del estado civil",
          "Secretaría distrital de movilidad",
          "Unidad administrativa especial migración colombia"
      ],
      "itemSeleccionado": ""
    };

    //al final de subscribe --> servicio completo se abre el modal
    //el setTimeout simula el tiempo de consulta del servicio y una vez finalizada la consulta
    // se abre el modal
    setTimeout(() => {
      this.removerFocus();
      this.ModalFiltroSegundoNivelComponent.abrirModal();
    }, 100);
  }

  itemFiltroNivelDos(item: string) {
    // Actualizar busqueda
  }
}
