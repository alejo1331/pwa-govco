import { Component, Input, OnChanges, SimpleChanges, ViewChildren, ElementRef, QueryList } from '@angular/core';
import { ValidarUrlService } from 'src/app/buscador-pwa/services/validar-url.service';
import { TramitesServiciosInterface } from 'src/app/categorias-pwa/Models/tramites-servicios-interface';
import { FiltrosTramitesService } from 'src/app/categorias-pwa/services/filtros-tramites/filtros-tramites.service';

@Component({
  selector: 'app-card-tramite',
  templateUrl: './card-tramite.component.html',
  styleUrls: ['./card-tramite.component.scss']
})
export class CardTramiteComponent implements OnChanges {

  @Input() data: TramitesServiciosInterface[];
  @Input() cantidadResultados: number;

  @ViewChildren('texto', { read: ElementRef })
  listaTexto: QueryList<ElementRef>;
  @ViewChildren('botonAcordeon', { read: ElementRef })
  ListaAcordeon: QueryList<ElementRef>;
  
  pageSize = 5;
  contadorResultados = 0;
  botonTexto: boolean[] = [];
  href: boolean = true;
  urlFichaTramite = '/ficha-tramites-y-servicios/T';
  expandirTexto: boolean = false;

  items: {
    active: boolean;
    costo: string;
    descripcion: string;
    enLinea: string;
    entidad: string;
    link: string;
    linkEntidad: string;
    tiempoObtencion: string;
    titulo: string;
  }[] = [];

  constructor(
    public validarUrlService: ValidarUrlService,
    public filtrosService: FiltrosTramitesService
  ) { }

  ngOnChanges(changes: SimpleChanges): void {
    const pageNumber = this.filtrosService.getFilters ? this.filtrosService.getFilters.pageNumber : 1;

    if (pageNumber == 1) {
      this.items = [];
      this.contadorResultados = 0;
    }
    
    changes.data.currentValue.forEach(
      (element: TramitesServiciosInterface, i: number) => {
        this.href = true;
        this.botonTexto[i] = false;
        
        if (element.link.includes(this.urlFichaTramite)) {
          const id: string = element.link.replace(/[^0-9]+/g, "");
          element.link = '';
          element.link = this.urlFichaTramite + id;
          this.href = false;
        }

        this.items.push({
          active: false,
          costo: element.costo,
          descripcion: element.descripcion,
          enLinea: element.enLinea,
          entidad: element.entidad,
          link: element.link,
          linkEntidad: element.linkEntidad,
          tiempoObtencion: element.tiempoObtencion,
          titulo: element.titulo,
        });

        if ((i + 1) == changes.data.currentValue.length) {
          setTimeout(() => {
            this.focusCard(pageNumber, changes.data.currentValue.length);
          }, 100);
        }
      }
    );
  }

  focusCard(pageNumber: number, cantidadResultados: number) {
    const buttons = document.querySelectorAll('#cardsTramite .card button');
    let button: HTMLElement;
    let buttonFocus: HTMLElement;
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

  activarItem(index:number) {
    this.items[index].active = !this.items[index].active;
    this.items.forEach(function(item, indexItem){
      if (indexItem != index) {
        item.active = false;
      }
    });
    this.expandirTexto = false;
    this.listaTexto
      .toArray()
    [index].nativeElement.classList.add('line-clamp-3');
    var element: HTMLElement = this.listaTexto.toArray()[index].nativeElement;
    this.ListaAcordeon.toArray()[index].nativeElement.addEventListener(
      'transitionend',
      () => {
        if (this.botonTexto[index] === false) {
          if (
            element.offsetHeight < element.scrollHeight ||
            element.offsetWidth < element.scrollWidth
          ) {
            this.botonTexto[index] = true;
          } else {
            this.botonTexto[index] = false;
          }
        }
      }
    );
  }

  expandirText(index: number) {
    this.listaTexto
      .toArray()
    [index].nativeElement.classList.toggle('line-clamp-3');
    this.expandirTexto = this.expandirTexto === true ? false : true;
  }

  VerMasResultados() {
    const pageNumber = this.filtrosService.getFilters ? this.filtrosService.getFilters.pageNumber : 1;

    this.filtrosService.setFilters = {
      filters: this.filtrosService.getFilters ? this.filtrosService.getFilters?.filters : null,
      pageNumber: pageNumber + 1,
      pageSize: this.pageSize,
      search: this.filtrosService.getFilters ? this.filtrosService.getFilters?.search : '',
      sort: '',
      seccion: this.filtrosService.getFilters?.seccion,
      spinner: false,
    };
    this.contadorResultados = this.pageSize * (pageNumber + 1);
  }

  VerMenosResultados() {
    this.filtrosService.setFilters = {
      filters: this.filtrosService.getFilters ? this.filtrosService.getFilters?.filters : null,
      pageNumber: 1,
      pageSize: this.pageSize,
      search: this.filtrosService.getFilters ? this.filtrosService.getFilters?.search : '',
      sort: '',
      seccion: this.filtrosService.getFilters?.seccion,
      spinner: false,
    };
    this.contadorResultados = 0;
  }
}
