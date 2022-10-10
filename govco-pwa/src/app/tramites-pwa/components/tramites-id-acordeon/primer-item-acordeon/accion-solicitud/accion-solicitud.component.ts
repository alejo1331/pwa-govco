import { Component, Input, OnInit } from '@angular/core';
import { ValidateUrlService } from 'src/app/tramites-pwa/services/validate-url.service';

@Component({
  selector: 'app-accion-solicitud',
  templateUrl: './accion-solicitud.component.html',
  styleUrls: ['./accion-solicitud.component.scss']
})
export class AccionSolicitudComponent implements OnInit {

  @Input() data: any;

  constructor(
    public validateUrlService: ValidateUrlService
  ) { }

  ngOnInit(): void {
  }

}
