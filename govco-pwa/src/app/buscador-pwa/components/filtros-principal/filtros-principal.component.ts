import { Component, OnInit, Input } from '@angular/core';
import { DATA_FILTRO_SECCIONES } from '../../models/dataFiltroSeccionesModel';
import { FiltrosService } from '../../services/filtros.service';
import { ResultadoFiltro } from '../../models/resultadoFiltroModel';

@Component({
  selector: 'app-filtros-principal',
  templateUrl: './filtros-principal.component.html',
  styleUrls: ['./filtros-principal.component.scss']
})
export class FiltrosPrincipalComponent implements OnInit {
  @Input() seleccion:string;
  @Input() busqueda:string;

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

  seleccionaFiltroNivelUno(idFiltro:string) {
    console.log('idFiltro', idFiltro)
  }

}
