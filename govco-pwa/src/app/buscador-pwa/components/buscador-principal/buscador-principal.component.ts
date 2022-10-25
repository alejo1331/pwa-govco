import { Component, OnInit } from '@angular/core';
import { ResultadoFiltro } from '../../models/resultadoFiltroModel';
import { FiltrosService } from '../../services/filtros.service';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-buscador-principal',
  templateUrl: './buscador-principal.component.html',
  styleUrls: ['./buscador-principal.component.scss']
})
export class BuscadorPrincipalComponent implements OnInit {

  filterSubscription: Subscription;
  resultadosBusqueda: ResultadoFiltro;

  constructor(
    protected filtrosService: FiltrosService
  ) { }

  ngOnInit(): void {
    this.filterSubscription = this.filtrosService.Filters$.subscribe((filters) => {
      this.filtrosService.obtenerResultadoFiltro(filters).subscribe(
        (data: ResultadoFiltro) => {
          this.resultadosBusqueda = data;
          this.filtrosService.ResultadoBusqueda = data;
        }
      );
    });

    // usar las siguientes lineas de codigo donde se cambie el texto del input de busqueda y donde se cambie el dato del desplegable
    this.filtrosService.Filters = {
      filters: null,
      pageNumber: 1,
      pageSize: 10,
      search: "empresa de servicios publicos aguas y aseo de el penol aap",
      sort: "",
      seccion: "tramite"
    }
  }

  ngOnDestroy() {
    this.filterSubscription.unsubscribe();
  }

}
