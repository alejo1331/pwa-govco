import { Component, Input, OnChanges, SimpleChanges, ViewChildren, QueryList, ElementRef } from '@angular/core';
import { EjerciciosParticipacionInterface } from 'src/app/buscador-pwa/models/ejercicios-participacion-interface';
import { FiltrosService } from 'src/app/buscador-pwa/services/filtros.service';
import { ValidarUrlService } from 'src/app/buscador-pwa/services/validar-url.service';
import { urlsLocal } from 'src/variables-globales/urlsLocal';

@Component({
  selector: 'app-buscador-card-ejercicios-participacion',
  templateUrl: './buscador-card-ejercicios-participacion.component.html',
  styleUrls: ['./buscador-card-ejercicios-participacion.component.scss']
})
export class BuscadorCardEjerciciosParticipacionComponent implements OnChanges {

  @Input() data: EjerciciosParticipacionInterface[];
  @Input() cantidadResultados: number;
  @ViewChildren('texto', { read: ElementRef }) listaTexto: QueryList<ElementRef>;
  @ViewChildren('botonAcordeon', { read: ElementRef }) ListaAcordeon: QueryList<ElementRef>;

  pageSize = 5;
  contadorResultados = 0;

  meses: string[] = ["enero", "febrero", "marzo", "abril", "mayo", "junio", "julio", "agosto", "septiembre", "octubre", "noviembre", "diciembre"];
  mesesNum: string[] = ["01", "02", "03", "04", "05", "06", "07", "08", "09", "10", "11", "12"];
  href: boolean = true;

  expandirTexto: boolean = false;
  botonTexto: boolean[] = [];

  public items: {
    active: boolean,
    titulo: string,
    urlParticipacion: string,
    descripcion: string,
    estado: string,
    fechaPublicacion: string,
    fechaCierre: string
  }[] = [];

  constructor(
    public validarUrlService: ValidarUrlService,
    public filtrosService: FiltrosService
  ) { }

  ngOnChanges(changes: SimpleChanges): void {
    const pageNumber = this.filtrosService.getFilters ? this.filtrosService.getFilters.pageNumber : 1;
    if (pageNumber == 1) {
      this.items = [];
      this.contadorResultados = 0;
    }
    changes.data.currentValue.forEach((element: EjerciciosParticipacionInterface, i: number) => {
      var fechaPublicacion: Array<string> = Array.from((element.fechaPublicacion.split(/\s+/).join('')).split("de"));
      var fechaCierre: Array<string> = Array.from((element.fechaCierre.split(/\s+/).join('')).split("de"));
      this.meses.forEach((mes, j) => {
        if (mes == fechaPublicacion[1]) {
          element.fechaPublicacion = fechaPublicacion[0] + '/' + this.mesesNum[j] + '/' + fechaPublicacion[2]
        }
        if (mes == fechaCierre[1]) {
          element.fechaCierre = fechaCierre[0] + '/' + this.mesesNum[j] + '/' + fechaCierre[2]
        }
      });
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
          titulo: element.titulo,
          urlParticipacion: element.link,
          descripcion: element.descripcion,
          estado: element.estado,
          fechaPublicacion: element.fechaPublicacion,
          fechaCierre: element.fechaCierre
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
    const buttons = document.querySelectorAll('#acordeonEjercicios .card button');
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
