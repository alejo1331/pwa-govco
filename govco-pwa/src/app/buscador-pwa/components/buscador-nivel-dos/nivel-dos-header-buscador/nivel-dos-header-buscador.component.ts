import { Component, ElementRef, Input, ViewChild, AfterViewInit } from '@angular/core';
import { Router } from '@angular/router';
import { BuscadorParams, BuscadorService } from 'src/app/buscador-pwa/services/buscador.service';
import { Parametros } from 'src/app/buscador-pwa/services/global';
import { ItemsBuscador } from 'src/variables-globales/items-buscador';
import { urlsLocal } from 'src/variables-globales/urlsLocal';
import { SugerenciasService } from '../../../services/sugerencias.service'

@Component({
  selector: 'app-nivel-dos-header-buscador',
  templateUrl: './nivel-dos-header-buscador.component.html',
  styleUrls: ['./nivel-dos-header-buscador.component.scss']
})
export class NivelDosHeaderBuscadorComponent implements AfterViewInit {

  @Input() activarServicio: boolean;
  @ViewChild('input') input: ElementRef<HTMLInputElement>;
  numeroSugerencias: number = Parametros.numeroSugerencias;
  maxlength: number = Parametros.maxLength;
  minCaracterTexto: number = Parametros.minCaracterTexto;
  maxLargoSugerencia: number = Parametros.maxLargoSugerencia;
  numeroSugerenciasDevueltas: number = 0;
  datosAutocompletar: any = [];
  txtConsumoApi = '';
  txtInputBuscador = '';
  index = 0;

  constructor(
    private sugerenciasService: SugerenciasService,
    private buscadorService: BuscadorService,
    private router: Router
  ) { }

  ngAfterViewInit() {
    var input = this.input.nativeElement
    this.buscadorService.getBuscadorParams$.subscribe(
      (parametros: BuscadorParams) => {
        this.txtConsumoApi = parametros.txtConsumoApi;
        this.txtInputBuscador = parametros.txtInputBuscador;
        this.index = parametros.index;
        input.value = this.txtInputBuscador
        if ((input.value == parametros.txtInputBuscador) && (input.value != '')) {
          this.cerrarBuscadorPWA();
          if (this.activarServicio === true) this.buscar();
        }
      }
    )
  }

  buscarSugerencias(event: any) {
    if (event.target.value.length < this.minCaracterTexto) {
      this.datosAutocompletar = []
      this.buscadorService.setSugerenrciasBuscador(this.datosAutocompletar)
    }
    else {
      this.sugerenciasService.obtenerSugerencias(this.txtConsumoApi,
        event.target.value,
        this.numeroSugerencias).subscribe((data) => {
          this.datosAutocompletar = data.filtros[0].sugerenciasFiltro;
          let regEx = new RegExp(event.target.value, 'gi');
          this.datosAutocompletar.forEach((name: any, index: any) => {
            this.datosAutocompletar[index] = [name, name.replace(regEx, "<strong>$&</strong>")]
          });
          this.buscadorService.setSugerenrciasBuscador(this.datosAutocompletar)
        }, (error) => {
          console.error(error);
        })
    }
  }

  keypressInput(event: KeyboardEvent) {
    var input = this.input.nativeElement;
    if (event.key === "Enter" && input.value != '') {
      if (this.activarServicio === true) this.buscar();
      this.cerrarBuscadorPWA();
      const nuevoBuscadorParams: BuscadorParams = {
        index: this.index,
        txtConsumoApi: this.txtConsumoApi,
        txtInputBuscador: input.value,
        aplicaGeoreferenciacion: ItemsBuscador[this.index].aplicaGeoreferenciacion
      }
      this.buscadorService.setBuscadorParams(nuevoBuscadorParams)
    }
  }

  buscar() {
    this.router.navigate(['/' + urlsLocal.buscador]);
  }

  cerrarBuscadorPWA() {
    this.buscadorService.setAbrirBuscador(false);
  }

}
