import { Component, Input, OnInit, ViewChild } from '@angular/core';
import { Subscription } from 'rxjs';
import { FiltroBusqueda, filter } from '../../models/filtroBusquedaModel';
import { FiltrosService } from '../../services/filtros.service';
import { FiltrosPrincipalComponent } from '../filtros-principal/filtros-principal.component';

@Component({
  selector: 'app-barra-filtros',
  templateUrl: './barra-filtros.component.html',
  styleUrls: ['./barra-filtros.component.scss']
})
export class BarraFiltrosComponent implements OnInit {

  @Input() totalResultados: any[];
  @ViewChild(FiltrosPrincipalComponent) FiltrosPrincipalComponent: FiltrosPrincipalComponent;

  public filtrosSubscription: Subscription
  totalFiltros: number = 0;

  constructor(protected filtrosService: FiltrosService) { }

  ngOnInit(): void {
    this.filtrosSubscription = this.filtrosService.Filters$.subscribe((resultados: FiltroBusqueda | undefined) => {
      this.totalFiltros = 0;
      if (resultados?.filters != undefined) {
        Object.entries(resultados?.filters).forEach(element => {
          if (element[0] != "departamento" && element[0] != "municipio") {
            this.totalFiltros += element[1] != undefined ? 1 : 0
          }
        })
      }
    });
  }

  filtroPrimerNivel() {
    this.FiltrosPrincipalComponent.abrirModal();
  }

}
