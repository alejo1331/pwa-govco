import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'app-buscador-card-entidades',
  templateUrl: './buscador-card-entidades.component.html',
  styleUrls: ['./buscador-card-entidades.component.scss'],
})
export class BuscadorCardEntidadesComponent implements OnInit {
  titleAcordeon = 'ALCALDÍA DE SAN MARTÍN DE LOS LLANOS. META';
  data = {
    Entidad: 'Territorial',
  };

  constructor() {}

  ngOnInit(): void {}
}
