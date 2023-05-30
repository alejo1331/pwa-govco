import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-tramites-destacados',
  templateUrl: './tramites-destacados.component.html',
  styleUrls: ['./tramites-destacados.component.scss']
})
export class TramitesDestacadosComponent implements OnInit {

  titulo: string = "";

  constructor() { }

  ngOnInit() {
    this.titulo ='Trámites destacados'
  }

}
