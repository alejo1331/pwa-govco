import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-ficha-especifica-detalle-pwa',
  templateUrl: './ficha-especifica-detalle-pwa.component.html',
  styleUrls: ['./ficha-especifica-detalle-pwa.component.scss'],
})
export class FichaEspecificaDetallePwaComponent implements OnInit {
  textoBoton: string = 'Iniciar trámite';
  urlBoton = '';

  constructor() {}

  ngOnInit(): void {}

  goToLink(url: string) {
    window.open(url, '_blank');
  }
}
