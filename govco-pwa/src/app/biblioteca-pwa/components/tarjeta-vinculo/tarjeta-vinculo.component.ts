import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-tarjeta-vinculo',
  templateUrl: './tarjeta-vinculo.component.html',
  styleUrls: ['./tarjeta-vinculo.component.scss'],
})
export class TarjetaVinculoComponent {
  @Input() fondoTarjeta = false;
  @Input() fondoIcono = false;
  @Input() filledIcon = false;
  @Input() colorTexto = false;
  @Input() textContainerMax = false;
  @Input() iconNameClass: string;
  @Input() textNameClass: string;
}
