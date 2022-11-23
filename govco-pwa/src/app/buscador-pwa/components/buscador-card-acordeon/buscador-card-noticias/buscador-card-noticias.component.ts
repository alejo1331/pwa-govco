import { Component, ElementRef, Input, OnChanges, QueryList, SimpleChanges, ViewChildren } from '@angular/core';
import { NoticiasInterface } from 'src/app/buscador-pwa/models/noticias-interface';
import { FiltrosService } from 'src/app/buscador-pwa/services/filtros.service';
import { ValidarUrlService } from 'src/app/buscador-pwa/services/validar-url.service';
import { urlsLocal } from 'src/variables-globales/urlsLocal';

@Component({
  selector: 'app-buscador-card-noticias',
  templateUrl: './buscador-card-noticias.component.html',
  styleUrls: ['./buscador-card-noticias.component.scss']
})
export class BuscadorCardNoticiasComponent implements OnChanges {

  @Input() data: NoticiasInterface[];
  @Input() cantidadResultados: number;
  @ViewChildren('texto', { read: ElementRef }) listaTexto: QueryList<ElementRef>;
  @ViewChildren('botonAcordeon', { read: ElementRef }) ListaAcordeon: QueryList<ElementRef>;

  pageSize = 5;
  contadorResultados = 0;

  href: boolean = true;

  expandirTexto: boolean = false;
  botonTexto: boolean[] = [];

  public items: {
    active: boolean,
    descripcion: string;
    fechaPublicacion: string;
    link: string;
    titulo: string;
  }[] = [];

  constructor(
    public validarUrlService: ValidarUrlService,
    public filtrosService: FiltrosService
  ) { }

  ngOnChanges(changes: SimpleChanges): void {
    const pageNumber = this.filtrosService.getFilters ? this.filtrosService.getFilters.pageNumber : 1;
    if (pageNumber == 1) {
      this.items = [];
    }
    changes.data.currentValue.forEach((element: NoticiasInterface, i: number) => {
      this.href = true;
      this.botonTexto[i] = false;
      Object.values(urlsLocal).find(url => {
        if (element.link.indexOf(url) >= 0) {
          return this.href = false;
        } else {
          return null;
        }
      })
      this.items.push(
        {
          active: false,
          descripcion: element.descripcion,
          fechaPublicacion: element.fechaPublicacion,
          link: element.link,
          titulo: element.titulo
        }
      )

      if ((i + 1) == changes.data.currentValue.length) {
        setTimeout(() => {
          this.focusCard(pageNumber);
        }, 100);
      }
    })
  }

  focusCard(pageNumber:number) {
    const buttons = document.querySelectorAll('#acordeonNoticias .card button');
    let button:HTMLElement;
    let buttonFocus:HTMLElement;
    if (pageNumber == 1) {
      buttonFocus = <HTMLElement>buttons[0];
      if (buttonFocus) {
        buttonFocus.focus();
      }
    } else {
      button = <HTMLElement>buttons[buttons.length - 6];
      buttonFocus = <HTMLElement>buttons[buttons.length - 5];
      if (button && buttonFocus) {
        buttonFocus.focus();
        button.scrollIntoView();
      }
    }
  }

  activarItem(index: number) {
    this.items[index].active = !this.items[index].active;
    this.items.forEach(function (item, indexItem) {
      if (indexItem != index) {
        item.active = false;
      }
    });
    this.expandirTexto = false;
    this.listaTexto.toArray()[index].nativeElement.classList.add('line-clamp-3');
    var element: HTMLElement = this.listaTexto.toArray()[index].nativeElement;
    this.ListaAcordeon.toArray()[index].nativeElement.addEventListener('transitionend', () => {
      if (this.botonTexto[index] === false) {
        if (element.offsetHeight < element.scrollHeight ||
          element.offsetWidth < element.scrollWidth) {
          this.botonTexto[index] = true;

        } else {
          this.botonTexto[index] = false;
        }
      }
    });
  }

  expandirText(index: number) {
    this.listaTexto.toArray()[index].nativeElement.classList.toggle('line-clamp-3');
    this.expandirTexto = (this.expandirTexto === true) ? false : true;
  }

  VerMasResultados() {
    const pageNumber = this.filtrosService.getFilters ? this.filtrosService.getFilters.pageNumber : 1;

    this.filtrosService.setFilters = {
      filters: this.filtrosService.getFilters ? this.filtrosService.getFilters?.filters : null,
      pageNumber: pageNumber + 1,
      pageSize: 5,
      search: this.filtrosService.getFilters  ? this.filtrosService.getFilters?.search : '',
      sort: '',
      seccion: this.filtrosService.getFilters?.seccion,
      spinner: false,
    };
  }

  VerMenosResultados(){
    this.filtrosService.setFilters = {
      filters: this.filtrosService.getFilters ? this.filtrosService.getFilters?.filters : null,
      pageNumber: 1,
      pageSize: this.pageSize,
      search: this.filtrosService.getFilters  ? this.filtrosService.getFilters?.search : '',
      sort: '',
      seccion: this.filtrosService.getFilters?.seccion,
      spinner: false,
    };
    this.contadorResultados = 0;
  }
}
