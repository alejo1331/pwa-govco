import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-codigos-ciiu-y-tramites',
  templateUrl: './codigos-ciiu-y-tramites.component.html',
  styleUrls: ['./codigos-ciiu-y-tramites.component.scss']
})
export class CodigosCiiuYTramitesComponent implements OnInit {

  Codigo: string = 'sobrenosotros';
  description: string = 'Esta consulta le permite identificar los trámites asociados a la actividad económica CIIU de su empresa o emprendimiento.';
  title: string = 'Codigo CIIU';
  title2: string = 'Consulta de trámites por actividad económica - CIIU';

  constructor() { }

  ngOnInit(): void {
  }

}
