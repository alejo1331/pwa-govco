import { Component, OnInit } from '@angular/core';
import { BuscadorService, BuscadorParams } from 'src/app/buscador-pwa/services/buscador.service';

@Component({
  selector: 'app-listado-sugerencias',
  templateUrl: './listado-sugerencias.component.html',
  styleUrls: ['./listado-sugerencias.component.scss']
})
export class ListadoSugerenciasComponent implements OnInit {

  listadoSugerencias = []
  buscadorParams : BuscadorParams;

  constructor(
    private buscadorService : BuscadorService
  ) { }

  ngOnInit() {
    this.buscadorService.getSugerenciasBuscador$.subscribe(
      (sugerencias : any) => {
        this.listadoSugerencias = sugerencias;
      }
    )

    this.buscadorService.getBuscadorParams$.subscribe(
      (parametros : BuscadorParams) => {
        this.buscadorParams = parametros;
      }
    )

  }

  seleccionarSugerencia(sugerencia:any){
    const nuevoBuscadorParams : BuscadorParams = {
      index : this.buscadorParams.index,
      txtConsumoApi : this.buscadorParams.txtConsumoApi,
      txtInputBuscador : sugerencia
    }
    this.buscadorService.setBuscadorParams(nuevoBuscadorParams)
  }

}
