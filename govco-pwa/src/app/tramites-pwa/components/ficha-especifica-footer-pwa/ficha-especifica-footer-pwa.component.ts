import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-ficha-especifica-footer-pwa',
  templateUrl: './ficha-especifica-footer-pwa.component.html',
  styleUrls: ['./ficha-especifica-footer-pwa.component.css'],
})
export class FichaEspecificaFooterPwaComponent{
  @Input() data: any;
}
