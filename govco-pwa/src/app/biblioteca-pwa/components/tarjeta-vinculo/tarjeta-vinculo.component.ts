import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'app-tarjeta-vinculo',
  templateUrl: './tarjeta-vinculo.component.html',
  styleUrls: ['./tarjeta-vinculo.component.scss'],
})
export class TarjetaVinculoComponent implements OnInit {
  @Input() fondoTarjeta = false;
  @Input() fondoIcono = false;
  @Input() filledIcon = false;
  @Input() colorTexto = false;
  @Input() textContainerMax = false;
  @Input() iconNameClass: string;
  @Input() textNameClass: string;
  @Input() ariaLabelText: string;
  @Input() disabledCard = false;

  constructor() {}

  ngOnInit(): void {}
}
