import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'app-etiqueta',
  templateUrl: './etiqueta.component.html',
  styleUrls: ['./etiqueta.component.scss']
})
export class EtiquetaComponent implements OnInit {

  @Input() estado: '' | 'informative' | 'warning' | 'danger' = '';

  constructor() { }

  ngOnInit(): void {
  }

}
