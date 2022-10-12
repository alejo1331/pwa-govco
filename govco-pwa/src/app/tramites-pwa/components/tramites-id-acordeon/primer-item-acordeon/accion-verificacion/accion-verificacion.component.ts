import { Component, Input, OnInit } from '@angular/core';
import { AccionVerificacion } from 'src/app/tramites-pwa/models/acordeon/acordeon-interface';

@Component({
  selector: 'app-accion-verificacion',
  templateUrl: './accion-verificacion.component.html',
  styleUrls: ['./accion-verificacion.component.scss']
})
export class AccionVerificacionComponent implements OnInit {

  @Input() data: AccionVerificacion[];

  constructor() { }

  ngOnInit(): void {
  }

}
