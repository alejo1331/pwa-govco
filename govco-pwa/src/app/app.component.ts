import { Component, ViewChild} from '@angular/core';
import { MatSidenav, MatSidenavContent } from '@angular/material/sidenav';


@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})


export class AppComponent {

  @ViewChild(MatSidenav) sidenav!: MatSidenav;
  @ViewChild(MatSidenavContent ) sidenavcontent!: MatSidenavContent;

  barraSuperiorGeneral :boolean = false;
  barraSuperiorInterna :boolean = true;

  constructor(){
  }

  estadoMenu(estado:boolean){
    console.log("estado del menu", estado)
    if(estado == true){
      this.sidenav.opened = true;
    }
    else {
      this.sidenav.opened = false;
    }
  }

  prueba(value: boolean){
    if(value === true){
      this.barraSuperiorGeneral = true;
      this.barraSuperiorInterna = false;
    }else{
      this.barraSuperiorGeneral = false;
      this.barraSuperiorInterna = true;
    }
  }
}
