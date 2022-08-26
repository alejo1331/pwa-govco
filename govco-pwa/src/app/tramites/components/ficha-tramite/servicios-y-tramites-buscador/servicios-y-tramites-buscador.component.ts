import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-servicios-y-tramites-buscador',
  templateUrl: './servicios-y-tramites-buscador.component.html',
  styleUrls: ['./servicios-y-tramites-buscador.component.scss']
})
export class ServiciosYTramitesBuscadorComponent implements OnInit {

  constructor() { }

  ngOnInit(): void {
    localStorage.setItem("consumidor","tramites");
  }

}
