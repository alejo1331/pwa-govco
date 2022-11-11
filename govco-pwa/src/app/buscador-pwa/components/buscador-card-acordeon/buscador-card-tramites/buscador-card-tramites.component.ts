import {
  Component,
  Input,
  OnChanges,
  SimpleChanges,
  ViewChildren,
  ElementRef,
  QueryList,
} from '@angular/core';
import { TramitesServiciosInterface } from 'src/app/buscador-pwa/models/tramites-servicios-interface';
import { urlsLocal } from 'src/variables-globales/urlsLocal';
import { ValidarUrlService } from 'src/app/buscador-pwa/services/validar-url.service';

@Component({
  selector: 'app-buscador-card-tramites',
  templateUrl: './buscador-card-tramites.component.html',
  styleUrls: ['./buscador-card-tramites.component.scss'],
})
export class BuscadorCardTramitesComponent implements OnChanges {
  @Input() data: TramitesServiciosInterface[];
  @ViewChildren('texto', { read: ElementRef })
  listaTexto: QueryList<ElementRef>;
  @ViewChildren('botonAcordeon', { read: ElementRef })
  ListaAcordeon: QueryList<ElementRef>;

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
  href: boolean = true;

  expandirTexto: boolean = false;
  botonTexto: boolean[] = [];

  constructor(public validarUrlService: ValidarUrlService) {}

  ngDoCheck() {
    if (this.items.length > 0) {
      if(document.getElementById('acordeonTramites')){
        $('#acordeonTramites div.card:nth-child(-n+5)').addClass('actived')
      }
    }
  }

  ngOnChanges(changes: SimpleChanges): void {
    if (changes.data.previousValue != changes.data.currentValue) {
      this.items = [];
    }
    changes.data.currentValue.forEach(
      (element: TramitesServiciosInterface, i: number) => {
        this.href = true;
        this.botonTexto[i] = false;
        Object.values(urlsLocal).find((url) => {
          element.link.indexOf(url) >= 0 ? (this.href = false) : null;
        });
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
      }
    );
  }

  activarItem(index: number) {
    this.items[index].active = !this.items[index].active;
    this.items.forEach(function (item, indexItem) {
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
        if (this.botonTexto[index] == false) {
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
    this.expandirTexto = this.expandirTexto == true ? false : true;
  }
  VerMasResultados() {
    let resultadosActivos = $('div.card');
    let ultimoActivo = resultadosActivos.filter('.actived:last').index();
    resultadosActivos
      .filter(':lt(' + (ultimoActivo + 6) + ')')
      .addClass('actived');
  }
}
