import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { BuscadorService } from '../../services/buscador-service/buscador-service.service';
import Resultados from '../../shared/models/resultados';
import ResultadosBusqueda from '../../shared/models/resultadosBusqueda';

declare var $: any;

@Component({
  selector: 'app-resultados',
  templateUrl: './resultados.component.html',
  styleUrls: ['./resultados.component.scss']
})
export class ResultadosComponent implements OnInit {

  resultados: Resultados[];
  resultadosBuscador: ResultadosBusqueda[];
  filtro: string = "";
  fechaPublicacion: string = "";
  contenidoId: string = "";
  seccionId: string = "";
  busqueda: string;
  constructor(private buscadorService: BuscadorService, private activatedRoute: ActivatedRoute) { }

  ngOnInit() {
    this.activatedRoute.queryParams
      .subscribe(params => {
        this.busqueda = params.busqueda == undefined ? "" : params.busqueda;
      });

    this.buscadorService.currentSearch.subscribe(query => setTimeout(() => {
      this.filtro = query == "" ? this.busqueda : query;
      this.getResultadosBuscador();
    }));

    this.buscadorService.currentContenido.subscribe(contenidoId => setTimeout(() => {
      this.contenidoId = contenidoId;
      this.getResultadosBuscador();
    }));

    this.buscadorService.currentSeccion.subscribe(seccionId => setTimeout(() => {
      this.seccionId = seccionId
      this.getResultadosBuscador();
    }));

    this.buscadorService.currentFecha.subscribe(fechaPublicacion => setTimeout(() => {
      this.fechaPublicacion = fechaPublicacion;
      this.getResultadosBuscador();
    }));
  }

  getResultados() {
    if (this.filtro != "" || this.contenidoId != "" || this.seccionId != "" || this.fechaPublicacion != "") {
      this.buscadorService.getResultados(this.filtro, this.fechaPublicacion, this.contenidoId, this.seccionId).subscribe((data) => {
        this.resultados = data;
      }, (error) => {
        console.error(error);
      })
    }
  }

  getResultadosBuscador() {
    if (this.filtro != "" || this.contenidoId != "" || this.seccionId != "" || this.fechaPublicacion != "" || 
      (this.filtro == "" && this.contenidoId == "" && this.seccionId == "" && this.fechaPublicacion == "")) {
      this.getResultadosBuscadorData();
    }
  }

  getResultadosBuscadorData() {
    this.buscadorService.getResultadosBuscador(this.filtro, this.fechaPublicacion, this.contenidoId, this.seccionId).subscribe((data) => {
      this.resultadosBuscador = data;
    }, (error) => {
      console.error(error);
    })
  }

  hyphenateUrlParams(str: string) {
    return str.split(' ').join('-').toLowerCase();
  }

}
