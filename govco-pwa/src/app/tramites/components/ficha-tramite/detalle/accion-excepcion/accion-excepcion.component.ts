import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-accion-excepcion',
  templateUrl: './accion-excepcion.component.html',
  styleUrls: ['./accion-excepcion.component.scss']
})
export class AccionExcepcionComponent {

  @Input() data: any;


}
