import { Component, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';
import { FiltrosTramitesService } from '../../services/filtros-tramites/filtros-tramites.service';
import { FiltroBusquedaTramites } from '../../Models/filtroBusquedaTramitesModel';

@Component({
  selector: 'app-todos-los-tramites',
  templateUrl: './todos-los-tramites.component.html',
  styleUrls: ['./todos-los-tramites.component.scss']
})
export class TodosLosTramitesComponent implements OnInit {

  dataResultado: any = [];
  cantidadResultados: number;
  filterSubscription: Subscription;

  constructor(    
    protected filtrosService: FiltrosTramitesService,
  ) { }

  ngOnInit(): void {
    this.cantidadResultados = 0;
    this.initializeParameters();
    this.suscripcionFilter();
  }

  initializeParameters() {
    this.filtrosService.setFilters = {
      pageNumber: 1,
      pageSize: 5,
      search: "  ",
      filters: {
        categorias: {
          nombre: "¿deseas viajar?"
        },
        tipocategorias: {
          sigla: "MV"
        }
      },
      sort: ""
    }
  }

  suscripcionFilter() {
    this.filterSubscription = this.filtrosService.getFilters$.subscribe(
      async (data: FiltroBusquedaTramites | undefined) => {

      console.log('data', data)
        
        if (data == undefined) {
          return;
        }
        this.dataResultado = [];

        if (data.pageNumber == 1) {
          this.cantidadResultados = 0;
        }

        //realizar busqueda
      }
    );
  }

}
