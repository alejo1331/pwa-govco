import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-banner-ciiu',
  templateUrl: './banner-ciiu.component.html',
  styleUrls: ['./banner-ciiu.component.scss']
})
export class BannerCiiuComponent implements OnInit {

  constructor() { }

  url: '/ficha-tramites-y-servicios/codigos-ciiu-y-tramites'
  titulo = 'Códigos CIIU y Trámites'

  ngOnInit(): void {
  }

}
