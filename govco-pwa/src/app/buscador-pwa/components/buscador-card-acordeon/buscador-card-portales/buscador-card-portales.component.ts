import { Component, Input, OnChanges, SimpleChanges, ViewChildren, ElementRef, QueryList } from '@angular/core';
import { PortalTransversalesInterface } from 'src/app/buscador-pwa/models/portal-transversales-interface';
import { urlsLocal } from 'src/variables-globales/urlsLocal';
import { ValidarUrlService } from 'src/app/buscador-pwa/services/validar-url.service';
import { FiltrosService } from 'src/app/buscador-pwa/services/filtros.service';

@Component({
  selector: 'app-buscador-card-portales',
  templateUrl: './buscador-card-portales.component.html',
  styleUrls: ['./buscador-card-portales.component.scss'],
})
export class BuscadorCardPortalesComponent implements OnChanges {

  @Input() data: PortalTransversalesInterface[];
  @Input() cantidadResultados: number;
  @ViewChildren('texto', { read: ElementRef }) listaTexto: QueryList<ElementRef>;
  @ViewChildren('botonAcordeon', { read: ElementRef }) ListaAcordeon: QueryList<ElementRef>;

  pageSize = 5;
  contadorResultados = 0;

  public items: {
    active: boolean,
    descripcion: string;
    entidadNombre: string;
    link: string;
    linkEntidad: string;
    titulo: string;
  }[] = [];
  href: boolean = true;

  expandirTexto: boolean = false;
  botonTexto: boolean[] = [];

  constructor(
    public validarUrlService: ValidarUrlService,
    public filtrosService: FiltrosService
  ) { }

  ngOnChanges(changes: SimpleChanges): void {
    const pageNumber = this.filtrosService.getFilters ? this.filtrosService.getFilters.pageNumber : 1;
    if (pageNumber == 1) {
      this.items = [];
    }
    changes.data.currentValue.forEach((element: PortalTransversalesInterface, i: number) => {
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
          entidadNombre: element.entidadNombre,
          link: element.link,
          linkEntidad: element.linkEntidad,
          titulo: element.titulo
        }
      )
    })

    const buttons = document.querySelectorAll('#acordeonNoticias .card button');
    let button:HTMLElement;
    if (pageNumber == 1) {
      button = <HTMLElement>buttons[0];
    } else {
      button = <HTMLElement>buttons[buttons.length - 1];
    }

    if (button) {
      setTimeout(() => {
        button.focus();
      }, 100);   
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
