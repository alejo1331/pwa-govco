import { Component, Input } from '@angular/core';
import { AccionDocumento } from 'src/app/tramites-pwa/models/acordeon/acordeon-interface';

@Component({
  selector: 'app-accion-documento',
  templateUrl: './accion-documento.component.html',
  styleUrls: ['./accion-documento.component.scss']
})
export class AccionDocumentoComponent {

  @Input() data: AccionDocumento[];

}
