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
    }
    changes.data.currentValue.forEach((element: EntidadesInterface) => {
      this.href = true;
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
          titulo: element.titulo,
          link: element.link,
          linkEntidad: element.linkEntidad,
          orden: element.orden
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
