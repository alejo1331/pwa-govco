import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { BuscadorParams, BuscadorService } from 'src/app/buscador-pwa/services/buscador.service';
import { Parametros } from 'src/app/buscador-pwa/services/global';
import { SugerenciasService } from '../../../services/sugerencias.service'

@Component({
  selector: 'app-nivel-dos-header-buscador',
  templateUrl: './nivel-dos-header-buscador.component.html',
  styleUrls: ['./nivel-dos-header-buscador.component.scss']
})
export class NivelDosHeaderBuscadorComponent implements OnInit {
  numeroSugerencias: number = Parametros.numeroSugerencias;
  maxlength: number = Parametros.maxLength;
  minCaracterTexto: number =  Parametros.minCaracterTexto;
  maxLargoSugerencia: number = Parametros.maxLargoSugerencia;
  numeroSugerenciasDevueltas: number = 0;
  datosAutocompletar = [];
  txtConsumoApi = '';
  txtInputBuscador = '';


  constructor(
    private sugerenciasService : SugerenciasService,
    private buscadorService : BuscadorService
  ) { }

  ngOnInit() {

    let input : any = document.querySelector("input");

    this.buscadorService.getBuscadorParams$.subscribe(
      (parametros : BuscadorParams) => {
        this.txtConsumoApi = parametros.txtConsumoApi;
        this.txtInputBuscador = parametros.txtInputBuscador;
        input.value = this.txtInputBuscador
        if((input.value == parametros.txtInputBuscador) && (input.value != '')){

          this.buscar(input.value)

      }}
    )

    input.addEventListener("keyup", (event:any) => {
      if (event.keyCode === 13) {
        this.buscar(input.value);
      }
    });
  }

  buscarSugerencias(event : any){
    if(event.target.value.length < this.minCaracterTexto){
      this.datosAutocompletar = []
    }
    else{
      this.sugerenciasService.obtenerSugerencias(this.txtConsumoApi,
      event.target.value,
      this.numeroSugerencias).subscribe((data) => {
        this.datosAutocompletar = data.filtros[0].sugerenciasFiltro;
        this.buscadorService.setSugerenrciasBuscador(this.datosAutocompletar)
    }, (error) => {
        console.error(error);
    })
    }
  }

  buscar(txtInput:any){
    if(txtInput == this.txtInputBuscador){
      console.log('buscar....')
    }

  }

  cerrarBuscadorPWA(){
    this.buscadorService.setAbrirBuscador(false)
  }

}
