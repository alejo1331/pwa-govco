import { Component, ElementRef, Input, ViewChild, AfterViewInit, HostListener } from '@angular/core';
import { Router } from '@angular/router';
import { AppComponent } from 'src/app/app.component';
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
  @ViewChild('botonAtras') botonAtras: ElementRef;
  numeroSugerencias: number = Parametros.numeroSugerencias;
  maxlength: number = Parametros.maxLength;
  minCaracterTexto: number = Parametros.minCaracterTexto;
  maxLargoSugerencia: number = Parametros.maxLargoSugerencia;
  numeroSugerenciasDevueltas: number = 0;
  datosAutocompletar: any = [];
  txtConsumoApi = '';
  txtInputBuscador = '';
  index = 0;
  matSidenavContent: HTMLElement;
  reiniciarFocus: boolean = true;

  constructor(
    private sugerenciasService: SugerenciasService,
    private buscadorService: BuscadorService,
    private router: Router,
    private appComponent: AppComponent
  ) { }

  ngAfterViewInit() {
    this.matSidenavContent = (
      document.getElementsByTagName('mat-sidenav-container') as HTMLCollectionOf<HTMLElement>
    )[0];
    var input = this.input.nativeElement
    this.buscadorService.getBuscadorParams$.subscribe(
      (parametros: BuscadorParams) => {
        this.txtConsumoApi = parametros.txtConsumoApi;
        this.txtInputBuscador = parametros.txtInputBuscador;
        this.index = parametros.index;
        input.value = this.txtInputBuscador
        if ((input.value == parametros.txtInputBuscador) && (input.value != '')) {
          if (this.activarServicio === true) {
            this.buscar()
          }
          this.buscarSugerencias()
        }
      }
    )
  }

  buscarSugerencias() {
    let inputBuscador: any = document.getElementById('buscador-pwa')
    if (inputBuscador.value.length < this.minCaracterTexto) {
      this.datosAutocompletar = []
      this.buscadorService.setSugerenrciasBuscador(this.datosAutocompletar)
    }
    else {
      let inputBuscadorSinTildes = inputBuscador.value.normalize("NFD").replace(/[\u0300-\u036f]/g, "")
      this.sugerenciasService.obtenerSugerencias(this.txtConsumoApi,
        inputBuscadorSinTildes,
        this.numeroSugerencias).subscribe((data) => {
          this.datosAutocompletar = data.filtros[0].sugerenciasFiltro;
          this.datosAutocompletar.forEach((name: any, index: any) => {
            this.datosAutocompletar[index] = [name,
              this.buscadorService.fnResaltarCoincidenciasXPalabras(
                this.buscadorService.fnSugerenciasSintaxis(name, this.maxLargoSugerencia), inputBuscadorSinTildes, 'i')
            ]
          });

          this.buscadorService.setSugerenrciasBuscador(this.datosAutocompletar)
        }, (error) => {
          console.error(error);
        })
    }
  }

  keyUpInput(event: KeyboardEvent) {
    let input = this.input.nativeElement;
    if (input.value.length >= 2) {
      if (event.key === "Enter" && input.value != '') {
        if (this.activarServicio === true) this.buscar();
        this.styleOpacity();
        const nuevoBuscadorParams: BuscadorParams = {
          index: this.index,
          txtConsumoApi: this.txtConsumoApi,
          txtInputBuscador: input.value,
          aplicaGeoreferenciacion: ItemsBuscador[this.index].aplicaGeoreferenciacion
        }
        this.buscadorService.setBuscadorParams(nuevoBuscadorParams)
      }
    }

  }

  buscar() {
    this.router.navigate(['/' + urlsLocal.buscador]);
  }

  cerrarBuscadorPWA() {
    this.buscadorService.setAbrirBuscador(false);
    this.reiniciarFocus = true
  }

  styleOpacity() {
    this.matSidenavContent.removeAttribute('style');
    let seccionBuscador: HTMLElement = this.appComponent.seccionBuscador.nativeElement;
    seccionBuscador.classList.add('off-buscador');
    this.appComponent.seccionBuscador.nativeElement.addEventListener('animationend', function (event: Event) {
      seccionBuscador.removeAttribute('style');
      seccionBuscador.classList.remove('off-buscador');
    });
  }

  focus() {
    this.botonAtras.nativeElement.focus();
    this.reiniciarFocus = false;
  }

  @HostListener('window:keyup', ['$event']) onTab(event: KeyboardEvent) {
    let evento : any = event.target
    if (this.reiniciarFocus) {
      this.focus();
    }

    if (evento.id == 5) {

      this.reiniciarFocus = true;
    }
  }

}
