import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'govco-app-cards-dos',
  templateUrl: './cards-dos.component.html',
  styleUrls: ['./cards-dos.component.scss']
})
export class CardsDosComponent implements OnInit {

  @Input() data: CardsDos[];

  constructor() { }

  ngOnInit() {
  }

}

export interface CardsDos {
  titulo: string,
  link: string,
  imagen: string
}
