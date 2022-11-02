import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-buscador-aviso',
  templateUrl: './buscador-aviso.component.html',
  styleUrls: ['./buscador-aviso.component.scss'],
})
export class BuscadorAvisoComponent implements OnInit {
  imageSrc = '../../../../assets/images/imgaviso.png';
  resBuscador = 'Ebuxación';
  geoLocMunName = 'Bogotá. D.C.';
  sugBuscador = 'Educación';
  constructor() {}

  ngOnInit(): void {}
}
