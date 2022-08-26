import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-ventanillas',
  templateUrl: './ventanillas.component.html',
  styleUrls: ['./ventanillas.component.scss']
})
export class VentanillasComponent implements OnInit {

  constructor() { }

  url = '/ventanillas-unicas'
  titulo = 'Ventanillas Únicas Digitales'

  ngOnInit(): void {
  }

}
