import { Component, OnInit } from '@angular/core';
import { ResultadoFiltro } from '../../models/resultadoFiltroModel';
import { FiltrosService } from '../../services/filtros.service';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-buscador-principal',
  templateUrl: './buscador-principal.component.html',
  styleUrls: ['./buscador-principal.component.css']
})
export class BuscadorPrincipalComponent implements OnInit {

  filterSubscription: Subscription;
  resultadosBusqueda: ResultadoFiltro;

  public busqueda = 'empresa de servicios publicos aguas y aseo de el penol aap';
  public seccion = 'noticia';

  constructor(
    protected filtrosService: FiltrosService
  ) { }

  ngOnInit(): void {
    this.filterSubscription = this.filtrosService.Filters$.subscribe(async (filters) => {
      if (filters == undefined) {
        return;
      }

      try {
        const resultado: ResultadoFiltro = await this.filtrosService.obtenerResultadoFiltro(filters).toPromise();

        this.resultadosBusqueda = resultado;
        this.filtrosService.ResultadoBusqueda = resultado;
        console.log('resultado principal', this.resultadosBusqueda)
      } catch (error) {
        console.error(error);
      }
    });

    // usar las siguientes lineas de codigo donde se cambie el texto del input de busqueda y donde se cambie el dato del desplegable
    this.filtrosService.Filters = {
      filters: null,
      pageNumber: 1,
      pageSize: 10,
      search: this.busqueda,
      sort: "",
      seccion: this.seccion
    }
  }

  ngOnDestroy() {
    this.filterSubscription.unsubscribe();
  }

}
