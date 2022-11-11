import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class HeaderService {

  private ocultarHeader = new BehaviorSubject<[boolean, boolean]> ([false, false]);
  public ocultandoHeader = this.ocultarHeader.asObservable();

  public estadoHeader( estilo: boolean, estado:boolean): void {
    this.ocultarHeader.next([estilo,estado]);
  }

}
