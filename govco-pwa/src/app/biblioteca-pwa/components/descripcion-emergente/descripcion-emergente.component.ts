import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-descripcion-emergente',
  templateUrl: './descripcion-emergente.component.html',
  styleUrls: ['./descripcion-emergente.component.scss']
})
export class DescripcionEmergenteComponent  {

  @Input() texto = '';

}
