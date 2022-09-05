import { Component, OnInit, Input } from '@angular/core';
import { ValidateUrlService } from 'src/app/tramites/services/validate-url.service';

@Component({
  selector: 'app-accion-pago',
  templateUrl: './accion-pago.component.html',
  styleUrls: ['./accion-pago.component.scss']
})
export class AccionPagoComponent implements OnInit {

  constructor(
    public validateUrlService: ValidateUrlService
  ) { }

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
