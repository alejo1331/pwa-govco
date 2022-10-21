import { Component, OnInit, Input, ViewChild } from '@angular/core';
import { DATA_FILTRO_SECCIONES } from '../../models/dataFiltroSeccionesModel';
import { FiltrosService } from '../../services/filtros.service';
import { ResultadoFiltro } from '../../models/resultadoFiltroModel';
import { ModalFiltroSegundoNivelComponent } from 'src/app/biblioteca-pwa/components/modal-filtro-segundo-nivel/modal-filtro-segundo-nivel.component';
import { ContenidoModalFiltroInterface, InformacionModalInterface } from '../../../biblioteca-pwa/models/filtro-nivel-dos/filtro-nivel-dos-interface';


@Component({
  selector: 'app-filtros-principal',
  templateUrl: './filtros-principal.component.html',
  styleUrls: ['./filtros-principal.component.scss']
})
export class FiltrosPrincipalComponent implements OnInit {
  @Input() seleccion: string;
  @Input() busqueda: string;
  @ViewChild(ModalFiltroSegundoNivelComponent) modalFiltro: ModalFiltroSegundoNivelComponent;
  informacionModalFiltro: InformacionModalInterface;


  public seccion = 'tramite';
  public seccionFiltros = DATA_FILTRO_SECCIONES;

  constructor(
    protected filtrosService: FiltrosService
  ) { }

  ngOnInit(): void {
    console.log('seccionFiltros', this.seccionFiltros)
    this.filtrosService.obtenerResultadoFiltro().subscribe(
      (data: ResultadoFiltro) => {
        console.log('data', data)
      }
    )
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
      this.modalFiltro.abrirModal();
    }, 100);
  }

  itemFiltroNivelDos(data: ContenidoModalFiltroInterface) {
    console.log('data', data);
  }

}
