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
    const elementSubcategorias = document.querySelector('.govco-pwa-momentos-subcategorias');
    elementSubcategorias?.scrollIntoView();
    elementSubcategorias?.classList.add('active-filter');
    const elementGeolocalizacion = document.querySelector('.barra-geolocalizacion-pwa-govco');
    elementGeolocalizacion?.classList.add('active-filter-tramites');
    const elementHeaderGovco = document.querySelector('.govco-pwa-header');
    elementHeaderGovco?.classList.add('hide');
    const elementContent = document.querySelector('.govco-pwa-content');
    elementContent?.classList.add('active-filter-tramites');
    const elementBottomMenu = document.querySelector('.govco-pwa-bottom-menu');
    elementBottomMenu?.classList.add('hide');
    this.FiltrosPrimerNivelComponent.abrirModal();
  }
}
