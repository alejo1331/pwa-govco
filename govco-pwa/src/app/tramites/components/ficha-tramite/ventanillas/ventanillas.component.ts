import { Component } from '@angular/core';

@Component({
  selector: 'app-ventanillas',
  templateUrl: './ventanillas.component.html',
  styleUrls: ['./ventanillas.component.scss']
})
export class VentanillasComponent {

  constructor() { }

  url = '/ventanillas-unicas'
  titulo = 'Ventanillas Únicas Digitales'

}
