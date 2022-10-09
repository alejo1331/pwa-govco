import { Component, OnInit, Input } from '@angular/core';
import { ValidateUrlService } from 'src/app/tramites-pwa/services/validate-url.service';

@Component({
  selector: 'app-accion-formulario',
  templateUrl: './accion-formulario.component.html',
  styleUrls: ['./accion-formulario.component.scss']
})
export class AccionFormularioComponent implements OnInit {

  @Input() data: any;

  constructor(
    public validateUrlService: ValidateUrlService
    ) { }

  ngOnInit(): void {
  }

}
