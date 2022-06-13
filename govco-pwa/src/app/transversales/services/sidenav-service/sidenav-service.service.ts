import { Injectable } from '@angular/core';
import { MatSidenav } from '@angular/material/sidenav';

@Injectable()

export class SidenavService {
  private sidenav: MatSidenav;

  public setSidnav(sidenav:MatSidenav){
    this.sidenav = sidenav
  }

  public abrir(){
    return this.sidenav.open()
  }

  public cerrar(){
    return this.sidenav.close()
  }

  public toogle():void{
    this.sidenav.toggle();
  }

}
