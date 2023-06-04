import { Component, OnInit, Input, ViewChild } from '@angular/core';
import { Subscription } from 'rxjs';
import { FiltrosPrimerNivelComponent } from '../filtros-primer-nivel/filtros-primer-nivel.component';
import { FiltrosTramitesService } from 'src/app/categorias-pwa/services/filtros-tramites/filtros-tramites.service';
import { FiltroBusquedaTramites } from 'src/app/categorias-pwa/Models/filtroBusquedaTramitesModel';

@Component({
  selector: 'app-barra-filtros',
  templateUrl: './barra-filtros.component.html',
  styleUrls: ['./barra-filtros.component.scss']
})
export class BarraFiltrosComponent implements OnInit {

  @Input() totalResultados: number;
  @ViewChild(FiltrosPrimerNivelComponent) FiltrosPrimerNivelComponent: FiltrosPrimerNivelComponent;

  public filtrosSubscription: Subscription
  totalFiltros: number = 0;

  constructor(protected filtrosService: FiltrosTramitesService) { }

  ngOnInit(): void {
    this.filtrosSubscription = this.filtrosService.getFilters$.subscribe((resultados: FiltroBusquedaTramites | undefined) => {
      this.totalFiltros = 0;
      if (resultados?.filters != undefined) {
        Object.entries(resultados?.filters).forEach(element => {
          if (element[0] != "departamento" && element[0] != "municipio" && 
            element[0] != "categorias" && element[0] != "tipocategorias") {
            this.totalFiltros += element[1] != undefined ? 1 : 0
          }
        })
      }
    });
  }

  abrirFiltroPrimerNivel() {
    const elementSubcategorias = document.querySelector('.modal-desplegable-pwa .container-header p');
    elementSubcategorias?.scrollIntoView({ inline: "start", block: "start" });
    const elementModal = document.querySelector('.modal-desplegable-pwa');
    elementModal?.classList.add('backdrop-active-filter-tramites');
    this.FiltrosPrimerNivelComponent.abrirModal();
  }
}
