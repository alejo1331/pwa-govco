import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'app-accion-excepcion',
  templateUrl: './accion-excepcion.component.html',
  styleUrls: ['./accion-excepcion.component.scss']
})
export class AccionExcepcionComponent implements OnInit {

  constructor() { }

  @Input() data: any;

  ngOnInit(): void {
  }

}
