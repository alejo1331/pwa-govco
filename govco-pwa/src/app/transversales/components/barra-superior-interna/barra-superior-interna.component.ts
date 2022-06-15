import { Component, OnInit, Output, Input, EventEmitter } from '@angular/core';

@Component({
  selector: 'app-barra-superior-interna',
  templateUrl: './barra-superior-interna.component.html',
  styleUrls: ['./barra-superior-interna.component.css']
})
export class BarraSuperiorInternaComponent implements OnInit {

  @Output() outEstadoMenu = new EventEmitter<boolean>();
  @Input() inEstadoMenu!: boolean;

  estadoMenu: boolean = false;

  constructor() { }

  ngOnInit(): void {
  }

  onClickMenu(){
    this.estadoMenu = this.estadoMenu? false : true;
    this.outEstadoMenu.emit(this.estadoMenu);
  }
}
