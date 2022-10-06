import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';

@Component({
  selector: 'app-buscador-sencillo-v1',
  templateUrl: './buscador-sencillo-v1.component.html',
  styleUrls: ['./buscador-sencillo-v1.component.scss']
})
export class BuscadorSencilloV1Component implements OnInit {

  @ViewChild('inputBuscador') inputBuscador : ElementRef;


  constructor() { }

  ngOnInit(): void {
  }

  borrarContenido() {
    this.inputBuscador.nativeElement.value = ''
  }

  buscarContenido() {

  }

}
