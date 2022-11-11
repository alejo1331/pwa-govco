import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-banner-detalle-internas-dos',
  templateUrl: './banner-detalle-internas-dos.component.html',
  styleUrls: ['./banner-detalle-internas-dos.component.scss']
})
export class BannerDetalleInternasDosComponent {

  @Input() categoria: any

}
