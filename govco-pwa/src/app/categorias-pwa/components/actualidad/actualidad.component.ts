import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-actualidad',
  templateUrl: './actualidad.component.html',
  styleUrls: ['./actualidad.component.scss']
})
export class ActualidadComponent implements OnInit {

  public data_actualidad: data_actualidad[];

  constructor() { }

  ngOnInit() {
  }

}

export interface data_actualidad {

}
