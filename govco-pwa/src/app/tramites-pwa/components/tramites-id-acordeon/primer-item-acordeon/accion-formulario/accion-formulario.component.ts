import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'app-accion-formulario',
  templateUrl: './accion-formulario.component.html',
  styleUrls: ['./accion-formulario.component.scss']
})
export class AccionFormularioComponent implements OnInit {

  @Input() data: any;

  constructor() { }

  ngOnInit(): void {
    console.log('data', this.data)
  }

}
