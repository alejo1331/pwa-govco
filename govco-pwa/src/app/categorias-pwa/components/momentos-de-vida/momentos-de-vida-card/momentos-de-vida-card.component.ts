import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'app-momentos-de-vida-card',
  templateUrl: './momentos-de-vida-card.component.html',
  styleUrls: ['./momentos-de-vida-card.component.css'],
})
export class MomentosDeVidaCardComponent implements OnInit {
  urlCategorias: string = '/categorias-subcategorias-pwa/';
  @Input() categoria: any;

  constructor() {}

  ngOnInit(): void {}
}
