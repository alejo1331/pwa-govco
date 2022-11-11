import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-boton',
  templateUrl: './boton.component.html',
  styleUrls: ['./boton.component.scss']
})
export class BotonComponent {

  @Input() symbol = false;
  @Input() inverted = false;
  @Input() border = false;
  @Input() disabled = false;


}
