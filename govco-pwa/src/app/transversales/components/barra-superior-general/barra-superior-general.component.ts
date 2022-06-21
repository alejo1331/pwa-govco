import { Component, EventEmitter, OnInit, Output, Input, OnChanges, SimpleChanges} from '@angular/core';

@Component({
  selector: 'app-barra-superior-general',
  templateUrl: './barra-superior-general.component.html',
  styleUrls: ['./barra-superior-general.component.css']
})
export class BarraSuperiorGeneralComponent {

  @Output() outEstadoMenu = new EventEmitter<boolean>();
  @Input() inEstadoMenu!: boolean;

  estadoMenu: boolean = false;

  constructor() {
   }

  onClickMenu(){
    this.estadoMenu = this.estadoMenu? false : true;
    this.outEstadoMenu.emit(this.estadoMenu);
  }

}
