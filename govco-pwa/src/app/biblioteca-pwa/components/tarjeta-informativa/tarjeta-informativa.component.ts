import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'app-tarjeta-informativa',
  templateUrl: './tarjeta-informativa.component.html',
  styleUrls: ['./tarjeta-informativa.component.css']
})
export class TarjetaInformativaComponent implements OnInit {

  @Input() imagen = '';
  @Input() descripcionImagen = '';
  @Input() url = '';
  @Input() descripcioUrl = '';
  @Input() titulo = '';

  constructor() { }

  ngOnInit(): void {
  }

}
