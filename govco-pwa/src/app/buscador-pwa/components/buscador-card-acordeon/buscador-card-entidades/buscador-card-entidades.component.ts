import { Component, Input, OnChanges, SimpleChanges } from '@angular/core';
import { EntidadesInterface } from 'src/app/buscador-pwa/models/entidades-interface';
import { urlsLocal } from 'src/variables-globales/urlsLocal';
import { ValidarUrlService } from 'src/app/buscador-pwa/services/validar-url.service';
import { FiltrosService } from 'src/app/buscador-pwa/services/filtros.service';

@Component({
  selector: 'app-buscador-card-entidades',
  templateUrl: './buscador-card-entidades.component.html',
  styleUrls: ['./buscador-card-entidades.component.scss'],
})
export class BuscadorCardEntidadesComponent implements OnChanges {

  @Input() data: EntidadesInterface[];
  @Input() cantidadResultados: number;

  pageSize = 5;
  contadorResultados = 0;

  public items: {
    active: boolean,
    link: string;
    linkEntidad: string;
    orden: string;
    titulo: string;
  }[] = [];
  href: boolean = true;

  constructor(
    public validarUrlService: ValidarUrlService,
    public filtrosService: FiltrosService
  ) {}

  ngOnChanges(changes: SimpleChanges): void {
    const pageNumber = this.filtrosService.getFilters ? this.filtrosService.getFilters.pageNumber : 1;
    if (pageNumber == 1) {
      this.items = [];
      this.contadorResultados = 0;
    }
    changes.data.currentValue.forEach((element: EntidadesInterface, i: number) => {
      this.href = true;
      for (const url of Object.values(urlsLocal)) {
        if (element.link.includes(url)) {
          this.href = false;
        }
      }
      this.items.push(
        {
          active: false,
          titulo: element.titulo,
          link: element.link,
          linkEntidad: element.linkEntidad,
          orden: element.orden
        }
      )

      if ((i + 1) == changes.data.currentValue.length) {
        setTimeout(() => {
          this.focusCard(pageNumber, changes.data.currentValue.length);
        }, 100);
      }
    })
  }

  focusCard(pageNumber:number, cantidadResultados:number) {
    const buttons = document.querySelectorAll('#acordeonEntidades .card button');
    let button:HTMLElement;
    let buttonFocus:HTMLElement;
    if (pageNumber == 1) {
      buttonFocus = <HTMLElement>buttons[0];
      if (buttonFocus) {
        buttonFocus.focus();
      }
    } else {
      button = <HTMLElement>buttons[buttons.length - cantidadResultados + 1];
      buttonFocus = <HTMLElement>buttons[buttons.length - cantidadResultados];
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
    this.contadorResultados = this.pageSize * (pageNumber + 1);
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
