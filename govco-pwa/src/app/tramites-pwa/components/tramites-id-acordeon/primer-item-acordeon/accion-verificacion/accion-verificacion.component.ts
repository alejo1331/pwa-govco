import { Component, Input } from '@angular/core';
import { AccionVerificacion } from 'src/app/tramites-pwa/models/acordeon/acordeon-interface';

@Component({
  selector: 'app-accion-verificacion',
  templateUrl: './accion-verificacion.component.html',
  styleUrls: ['./accion-verificacion.component.scss']
})
export class AccionVerificacionComponent {

  @Input() data: AccionVerificacion[];

}
