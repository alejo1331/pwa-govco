import { Component, Input, OnChanges, OnInit, SimpleChanges } from '@angular/core';
import { elementAt } from 'rxjs/operators';
import { ValidarUrlService } from 'src/app/buscador-pwa/services/validar-url.service';
import { urlsLocal } from 'src/variables-globales/urlsLocal';


@Component({
  selector: 'govco-app-cards-uno',
  templateUrl: './cards-uno.component.html',
  styleUrls: ['./cards-uno.component.scss']
})
export class CardsUnoComponent implements OnInit, OnChanges {

  public items_href: CardsUnoHref[] = [];

  @Input() data: CardsUno[];

  constructor(
    public validarUrlService: ValidarUrlService,
  ) { }

  ngOnInit(): void {
  }

  ngOnChanges(changes: SimpleChanges): void {
    this.items_href = []
    if (changes.data.currentValue.length > 0) {
      changes.data.currentValue.forEach((element: CardsUno, i: number) => {
        this.items_href.push({
          href: true,
          link: element.link,
          titulo: element.titulo
        })
        for (const url of Object.values(urlsLocal)) {
          if (element.link.includes(url)) {
            this.items_href[i] = {
              href: false,
              link: element.link,
              titulo: element.titulo
            }
          }
        }
      })
    }
  }

}

export interface CardsUno {
  link: string,
  titulo: string
}

export interface CardsUnoHref {
  href: boolean,
  link: string,
  titulo: string
}
