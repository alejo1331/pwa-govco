import { Component, EventEmitter, OnInit, Output } from '@angular/core';

@Component({
  selector: 'app-barra-superior',
  templateUrl: './barra-superior.component.html',
  styleUrls: ['./barra-superior.component.css']
})
export class BarraSuperiorComponent implements OnInit {
  
  @Output() outEstadoMenu = new EventEmitter<boolean>();

  estadoMenu: boolean = false;
  barraSuperiorInterna: boolean = false;

  constructor() { }

  ngOnInit(): void {
  }

  onClickMenu(){
    this.estadoMenu = this.estadoMenu? false : true;
    this.outEstadoMenu.emit(this.estadoMenu);
  }

}
