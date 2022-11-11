import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'app-accion-documento',
  templateUrl: './accion-documento.component.html',
  styleUrls: ['./accion-documento.component.scss']
})
export class AccionDocumentoComponent implements OnInit {

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
