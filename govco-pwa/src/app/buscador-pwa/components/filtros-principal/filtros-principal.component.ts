import { Component, OnInit, Input, ViewChild, ElementRef } from '@angular/core';
import { DATA_FILTRO_SECCIONES } from '../../models/dataFiltroSeccionesModel';
import { FiltrosService } from '../../services/filtros.service';
import { ResultadoFiltro } from '../../models/resultadoFiltroModel';
import { ModalFiltroSegundoNivelComponent } from '../../../biblioteca-pwa/components/modal-filtro-segundo-nivel/modal-filtro-segundo-nivel.component';
import { ContenidoModalFiltroInterface, InformacionModalInterface } from '../../../biblioteca-pwa/models/filtro-nivel-dos/filtro-nivel-dos-interface';
import { FiltroBusqueda } from '../../models/filtroBusquedaModel';
import { Subscription } from 'rxjs';
import { Platform } from '@angular/cdk/platform';


@Component({
  selector: 'app-filtros-principal',
  templateUrl: './filtros-principal.component.html',
  styleUrls: ['./filtros-principal.component.scss']
})
export class FiltrosPrincipalComponent implements OnInit {
  @Input() seleccion: string;
  @Input() busqueda: string;
  @ViewChild('modalFiltroNivel1') filtroPrimerNivel: ElementRef;
  @ViewChild(ModalFiltroSegundoNivelComponent) ModalFiltroSegundoNivelComponent: ModalFiltroSegundoNivelComponent;
  informacionModalFiltro: InformacionModalInterface;


  public seccion = 'tramite';
  public seccionFiltros = DATA_FILTRO_SECCIONES;
  resultadosSubscription: Subscription;

  constructor(
    protected filtrosService: FiltrosService,
    public platform: Platform
  ) { }

  ngOnInit(): void {  
    this.resultadosSubscription = this.filtrosService.ResultadoBusqueda$.subscribe((resultados) => {
      console.log('resultados',resultados);
    });
  }

  seleccionaFiltroNivelUno(idFiltro: string, tituloFiltro: string) {
    console.log('idFiltro', idFiltro)
    //inicia el servicio para el filtro de segundo nivel
    this.informacionModalFiltro = {
      titulo: tituloFiltro,
      contendioModal: [
        { item: 'Artesanías', idItem: 0 },
        { item: 'Formación empresarial', idItem: 1 },
        { item: 'Industria y comercio', idItem: 2 },
        { item: 'Matricula empresa', idItem: 3 },
        { item: 'Artesanías colombiana', idItem: 4 },
        { item: 'Formación empresarial extranjera', idItem: 5 },
        { item: 'Industria y comercio mixta', idItem: 6 },
        { item: 'Inscripción casa de la cultura', idItem: 7 },
        { item: 'Matricula empresa publica', idItem: 8 },
        { item: 'Matricula empresa extranjera', idItem: 9 },
        { item: 'Formación empresarial privada', idItem: 10 },
      ]
    }
    //al final de subscribe --> servicio completo se abre el modal
    //el setTimeout simula el tiempo de consulta del servicio y una vez finalizada la consulta
    // se abre el modal
    setTimeout(() => {
      this.ModalFiltroSegundoNivelComponent.abrirModal();
    }, 100);
  }

  abrirModal() {
    this.filtroPrimerNivel.nativeElement.classList.toggle('show');
    if (this.platform.IOS || this.platform.SAFARI) {
      var body = (document.getElementsByTagName('body') as HTMLCollectionOf<HTMLElement>)[0];
      body.classList.toggle('contenido-body');
    }
  }

  itemFiltroNivelDos(data: ContenidoModalFiltroInterface) {
    console.log('data', data);
    // this.filtrosService.Filters = {
    //   filters: null,
    //   pageNumber: 1,
    //   pageSize: 10,
    //   search: "empresa de servicios publicos aguas y aseo de el penol aap" + this.y,
    //   sort: "",
    //   seccion: ""
    // }
  }

  ngOnDestroy() {
    this.resultadosSubscription.unsubscribe();
  }

}
