import { Component, OnInit, ViewChild } from '@angular/core';
import { FiltrosPrincipalComponent } from '../filtros-principal/filtros-principal.component';

@Component({
  selector: 'app-barra-filtros',
  templateUrl: './barra-filtros.component.html',
  styleUrls: ['./barra-filtros.component.scss']
})
export class BarraFiltrosComponent implements OnInit {

  @ViewChild(FiltrosPrincipalComponent) FiltrosPrincipalComponent: FiltrosPrincipalComponent;

  constructor() { }

  ngOnInit(): void {
  }

  filtroPrimerNivel() {
    this.FiltrosPrincipalComponent.abrirModal();
  }

}
