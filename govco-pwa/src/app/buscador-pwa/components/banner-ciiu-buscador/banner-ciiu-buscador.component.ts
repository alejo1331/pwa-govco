import { Component } from '@angular/core';

@Component({
  selector: 'app-banner-ciiu-buscador',
  templateUrl: './banner-ciiu-buscador.component.html',
  styleUrls: ['./banner-ciiu-buscador.component.scss'],
})
export class BannerCiiuBuscadorComponent {
  url: '/ficha-tramites-y-servicios/codigos-ciiu-y-tramites';
  titulo = 'Códigos CIIU y Trámites';
}
