import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-banner-principal-pwa',
  templateUrl: './banner-principal-pwa.component.html',
  styleUrls: ['./banner-principal-pwa.component.scss']
})
export class BannerPrincipalPwaComponent implements OnInit {
  public titleBanner: string = 'Bienvenido a GOV.CO';
  public textoBanner: string = '!No mas vueltas! Encuentra tramites, servicios e informacion del Estado colombiano'
  public textoPrimario: string = 'Facilitamos tu busqueda.'
  public textoSecundario: string = 'Encuentra tramites y servicios segun tu momento de vida.'

  constructor() { }

  ngOnInit() {
  }

}
