import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-etiqueta',
  templateUrl: './etiqueta.component.html',
  styleUrls: ['./etiqueta.component.scss']
})
export class EtiquetaComponent {

  @Input() estado: '' | 'informative' | 'warning' | 'danger' = '';

}
