import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'app-accion-verificacion',
  templateUrl: './accion-verificacion.component.html',
  styleUrls: ['./accion-verificacion.component.scss']
})
export class AccionVerificacionComponent implements OnInit {

  constructor() { }

  @Input() data: any;

  dataAccion: any[] = [];

  ngOnInit(): void {
    this.validarEstadoExcepcion();
  }

  private validarEstadoExcepcion() {
    if (typeof(this.data.length) !== 'undefined') {
      this.dataAccion = this.data;
    } else {
      this.dataAccion.push(this.data);
    }
  }

}
