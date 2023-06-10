import { Component, Input, OnInit } from '@angular/core';
import { urlsLocal } from 'src/variables-globales/urlsLocal';

@Component({
  selector: 'app-momentos-de-vida-card',
  templateUrl: './momentos-de-vida-card.component.html',
  styleUrls: ['./momentos-de-vida-card.component.css'],
})
export class MomentosDeVidaCardComponent implements OnInit {
  urlCategorias: string = '/' + urlsLocal.categorias_subcategorias + '/';
  @Input() categoria: any;

  constructor() { }

  ngOnInit(): void { }

  textCardTransform(text: string) {
    let init = 0;
    let end = 1;
    const textLower = text.toLowerCase().trim();
    if (textLower[0] === '_' || textLower[0] === '!' || textLower[0] === '¿') {
      end = 2;
    }
    const textUpdated =
      textLower.slice(init, end).toUpperCase() +
      textLower.slice(end).toLocaleLowerCase();
    return textUpdated.length > 40
      ? textUpdated.slice(0, 40) + '...'
      : textUpdated;
  }
}
