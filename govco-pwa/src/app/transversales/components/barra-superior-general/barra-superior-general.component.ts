import { Component, EventEmitter, OnInit, Output, Input, OnChanges, SimpleChanges} from '@angular/core';

@Component({
  selector: 'app-barra-superior-general',
  templateUrl: './barra-superior-general.component.html',
  styleUrls: ['./barra-superior-general.component.css']
})
export class BarraSuperiorGeneralComponent implements OnInit, OnChanges {

  @Output() outEstadoMenu = new EventEmitter<boolean>();
  @Input() inEstadoMenu!: boolean;

  estadoMenu: boolean = false;

  constructor() {
   }

  ngOnInit(): void {
  }

  ngOnChanges(changes: SimpleChanges): void {
    this.estadoMenu = changes.inEstadoMenu.currentValue;
  }

  onClickMenu(estado:boolean){
    this.estadoMenu = this.estadoMenu? false : true;
    this.outEstadoMenu.emit(this.estadoMenu);
  }

}
