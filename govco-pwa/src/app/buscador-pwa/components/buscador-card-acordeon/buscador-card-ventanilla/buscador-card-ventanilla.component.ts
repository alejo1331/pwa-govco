import { Component, Input, OnInit, OnChanges, SimpleChanges } from '@angular/core';
import { VentanillasUnicasInterface } from 'src/app/buscador-pwa/models/ventanillas-unicas-interface';
import { urlsLocal } from 'src/variables-globales/urlsLocal';

@Component({
  selector: 'app-buscador-card-ventanilla',
  templateUrl: './buscador-card-ventanilla.component.html',
  styleUrls: ['./buscador-card-ventanilla.component.scss']
})
export class BuscadorCardVentanillaComponent implements OnInit, OnChanges {

  @Input() data: VentanillasUnicasInterface[];

  public items: {
    active: boolean,
    descripcion: string;
    entidadNombre: string;
    link: string;
    linkEntidad: string;
    titulo: string;
  }[] = [];
  href: boolean = true;

  constructor() { }

  ngOnInit(): void { }

  ngOnChanges(changes: SimpleChanges): void {
    if (changes.data.previousValue != changes.data.currentValue) {
      this.items = []
    };
    changes.data.currentValue.forEach((element: VentanillasUnicasInterface) => {
      this.href = true;
      Object.values(urlsLocal).find(url => {
        element.link.indexOf(url) >= 0 ? this.href = false : null;
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
  }

  activarItem(index: number) {
    this.items[index].active = !this.items[index].active;
    this.items.forEach(function (item, indexItem) {
      if (indexItem != index) {
        item.active = false;
      }
    });
  }

}
