import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { Router } from '@angular/router';
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
  datosAutocompletar : any = [];
  txtConsumoApi = '';
  txtInputBuscador = '';


  constructor(
    private sugerenciasService : SugerenciasService,
    private buscadorService : BuscadorService,
    private router : Router
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
      this.buscadorService.setSugerenrciasBuscador(this.datosAutocompletar)
    }
    else{
      this.sugerenciasService.obtenerSugerencias(this.txtConsumoApi,
      event.target.value,
      this.numeroSugerencias).subscribe((data) => {
        this.datosAutocompletar = data.filtros[0].sugerenciasFiltro;
        let regEx = new RegExp(event.target.value, 'gi');
        this.datosAutocompletar.forEach((name : any , index : any) => {
          this.datosAutocompletar[index] = [name, name.replace(regEx, "<strong>$&</strong>")]
        });
        this.buscadorService.setSugerenrciasBuscador(this.datosAutocompletar)
    }, (error) => {
        console.error(error);
    })
    }
  }

  buscar(txtInput:any){
    if(txtInput == this.txtInputBuscador){
      this.cerrarBuscadorPWA()
      this.router.navigateByUrl('/buscar-pwa')
    }

  }

  cerrarBuscadorPWA(){
    this.buscadorService.setAbrirBuscador(false)
  }

}
