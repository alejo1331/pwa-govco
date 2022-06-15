import { Component, ViewChild} from '@angular/core';
import { MatSidenav, MatSidenavContent } from '@angular/material/sidenav';
import { SidenavService } from './transversales/services/sidenav-service/sidenav-service.service';


@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})


export class AppComponent {

  @ViewChild('sidenav') sidenav!: MatSidenav;
  @ViewChild(MatSidenavContent ) sidenavcontent!: MatSidenavContent;

  barraSuperiorGeneral :boolean = true;
  barraSuperiorInterna :boolean = false;

  statusMenu:boolean = false;

  constructor(
    private sidenavService : SidenavService){}

  ngAfterContentChecked(): void {
    this.sidenavService.setSidnav(this.sidenav)
  }

  estadoMenu(estado:boolean){
    this.statusMenu = estado;
    if(estado == true){
      this.sidenav.opened = true;
    }
    else {
      this.sidenav.opened = false;
    }
  }

}
