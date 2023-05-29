import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-todos-los-tramites',
  templateUrl: './todos-los-tramites.component.html',
  styleUrls: ['./todos-los-tramites.component.scss']
})
export class TodosLosTramitesComponent implements OnInit {

  cantidadResultados: number;

  constructor() { }

  ngOnInit(): void {
    this.cantidadResultados = 0;
  }

}
