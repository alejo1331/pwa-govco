import { Component, EventEmitter, OnInit, Output} from '@angular/core';

@Component({
  selector: 'app-barra-superior-general',
  templateUrl: './barra-superior-general.component.html',
  styleUrls: ['./barra-superior-general.component.css']
})
export class BarraSuperiorGeneralComponent implements OnInit {

  @Output() outEstadoMenu = new EventEmitter<boolean>();
  estadoMenu: boolean = false;

  constructor() {
   }

  ngOnInit(): void {
  }

  onClickMenu(estado:boolean){
    this.estadoMenu = this.estadoMenu? false : true;
    this.outEstadoMenu.emit(this.estadoMenu);
  }

}
