import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-entidades-estado',
  templateUrl: './entidades-estado.component.html',
  styleUrls: ['./entidades-estado.component.scss']
})
export class EntidadesEstadoComponent implements OnInit {
  public parametroBuscador : string 
  constructor() { 
    this.parametroBuscador = '';
  }

  ngOnInit(): void {
  }

}
