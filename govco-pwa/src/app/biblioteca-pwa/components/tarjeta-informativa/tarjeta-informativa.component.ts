import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-tarjeta-informativa',
  templateUrl: './tarjeta-informativa.component.html',
  styleUrls: ['./tarjeta-informativa.component.scss']
})

export class TarjetaInformativaComponent {
  @Input() imagen = '';
  @Input() descripcionImagen = '';
  @Input() url = '';
  @Input() descripcioUrl = '';
  @Input() titulo = '';
}
