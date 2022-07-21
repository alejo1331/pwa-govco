import { Injectable } from '@angular/core';
import { MatSidenav } from '@angular/material/sidenav';
import { BehaviorSubject } from 'rxjs';

@Injectable()

export class SidenavService {

  private modificarItem = new BehaviorSubject<[boolean,string]>([false,'']);
  public modificandoItem = this.modificarItem.asObservable();
  
  private sidenav: MatSidenav;

  public seleccionandoItem(opcion: boolean, idItem: string): void {
    this.modificarItem.next([opcion, idItem]);
  }

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
