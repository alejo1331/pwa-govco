import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'app-accion-documento',
  templateUrl: './accion-documento.component.html',
  styleUrls: ['./accion-documento.component.scss']
})
export class AccionDocumentoComponent implements OnInit {

  @Input() data: any;

  constructor() { }

  ngOnInit(): void {
  }

}
