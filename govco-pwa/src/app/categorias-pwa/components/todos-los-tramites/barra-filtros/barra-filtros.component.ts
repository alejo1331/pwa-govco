import { Component, OnInit, Input, ViewChild } from '@angular/core';
import { FiltrosPrimerNivelComponent } from '../filtros-primer-nivel/filtros-primer-nivel.component';

@Component({
  selector: 'app-barra-filtros',
  templateUrl: './barra-filtros.component.html',
  styleUrls: ['./barra-filtros.component.scss']
})
export class BarraFiltrosComponent implements OnInit {

  @Input() totalResultados: number;
  @ViewChild(FiltrosPrimerNivelComponent) FiltrosPrimerNivelComponent: FiltrosPrimerNivelComponent;

  constructor() { }

  ngOnInit(): void {
  }

  abrirFiltroPrimerNivel() {
    const elementSubcategorias = document.querySelector('.modal-desplegable-pwa .container-header p');
    elementSubcategorias?.scrollIntoView({ inline: "start", block: "start" });
    const elementModal = document.querySelector('.modal-desplegable-pwa');
    elementModal?.classList.add('backdrop-active-filter-tramites');
    this.FiltrosPrimerNivelComponent.abrirModal();
  }
}
