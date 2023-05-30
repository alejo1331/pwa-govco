import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'app-barra-filtros',
  templateUrl: './barra-filtros.component.html',
  styleUrls: ['./barra-filtros.component.scss']
})
export class BarraFiltrosComponent implements OnInit {

  @Input() totalResultados: number;

  constructor() { }

  ngOnInit(): void {
  }

}
