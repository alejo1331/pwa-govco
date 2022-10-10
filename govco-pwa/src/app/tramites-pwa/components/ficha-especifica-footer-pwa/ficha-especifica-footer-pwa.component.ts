import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'app-ficha-especifica-footer-pwa',
  templateUrl: './ficha-especifica-footer-pwa.component.html',
  styleUrls: ['./ficha-especifica-footer-pwa.component.css'],
})
export class FichaEspecificaFooterPwaComponent implements OnInit {
  @Input() data: any;

  constructor() {}

  ngOnInit(): void {}
}
