import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { ResultadoFiltro } from '../../models/resultadoFiltroModel';
import { FiltrosService } from '../../services/filtros.service';
import { Subscription } from 'rxjs';
import { BottomMenuService } from 'src/app/transversales/services/bottom-menu/bottom-menu.service';
import { HeaderService } from 'src/app/transversales/services/header-service/header.service';
import { SidenavService } from 'src/app/transversales/services/sidenav-service/sidenav-service.service';
import { BuscadorService, BuscadorParams } from '../../services/buscador.service';

@Component({
  selector: 'app-buscador-principal',
  templateUrl: './buscador-principal.component.html',
  styleUrls: ['./buscador-principal.component.scss']
})
export class BuscadorPrincipalComponent implements OnInit {

  @ViewChild('resultados') resultados: ElementRef;

  filterSubscription: Subscription;
  resultadosBusqueda: ResultadoFiltro;

  public busqueda = 'empresa de servicios publicos aguas y aseo de el penol aap';
  public seccion = 'tramite';

  constructor(
    protected filtrosService: FiltrosService,
    public bottomService: BottomMenuService,
    protected servicioHeader: HeaderService,
    protected servicioSideNav: SidenavService,
    private buscadorService : BuscadorService,
  ) {
    this.bottomService.putOcultandoBottomMenu(false);
  }

  ngOnInit(): void {
    // servicioHeader.estadoHeader(a, b)       a -> true = header seccion internas
    //                                         a -> false = header general
    //                                         b -> Muestra/Oculta  Header
    //bottomService.seleccionandoItem(0)       0 -> Activa boton incio del menu inferior
    //                                         1, 2, 3 -> Tramites, Ingresa
    //servicioSideNav.seleccionandoItem(a, b)  a -> Activa o inactiva menu lateral
    //                                         b -> String con el valor del item a seleccionar
    //bottomService.ajustandoPantalla(true)    true -> Agrega clase de css para ajustar
    //                                                 la pantalla cuando en la seccion
    //                                                 consultada no tiene header

    this.buscadorService.getBuscadorParams$.subscribe(
      (parametros : BuscadorParams) => {
        this.busqueda = parametros.txtInputBuscador;
        this.seccion = parametros.txtConsumoApi
      })

    this.servicioHeader.estadoHeader(false, true);
    this.bottomService.seleccionandoItem(0);
    this.bottomService.ajustandoPantalla(false);
    this.servicioSideNav.seleccionandoItem(false, 'null');
    (document.getElementById('topScroll') as HTMLElement).style.top = '7.25rem';
    (document.getElementById('topScroll') as HTMLElement).scrollTop = 0;
    this.filterSubscription = this.filtrosService.Filters$.subscribe(async (filters) => {
      if (filters == undefined) {
        return;
      }

      try {
        const resultado: ResultadoFiltro = await this.filtrosService.obtenerResultadoFiltro(filters).toPromise();
        // Se almacena la respuesta de la búsqueda
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
