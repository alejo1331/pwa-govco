import { Component, Input, OnInit, ViewChild } from '@angular/core';
import { Subscription } from 'rxjs';
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
    this.filtrosSubscription = this.filtrosService.Filters$.subscribe((resultados) => {
      this.totalFiltros = resultados?.filters != undefined ?
        Object.keys(resultados?.filters).length : 0
    });
  }

  filtroPrimerNivel() {
    this.FiltrosPrincipalComponent.abrirModal();
  }

}
