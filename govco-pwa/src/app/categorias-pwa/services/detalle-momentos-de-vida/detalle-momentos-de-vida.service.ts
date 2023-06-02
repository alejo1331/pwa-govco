import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class DetalleMomentosDeVidaService {

  private id_momento$ = new BehaviorSubject<string>('');

  constructor() { }

  // El siguiente fragmento de codigo permite capturar y leer el id de la seccion detalle momento
  // seleccionada
  get getIdMomento$(): Observable<string> {
    return this.id_momento$.asObservable();
  }
  // Set para asignar id del momento de vida
  setIdMomento(id: string): void {
    this.id_momento$.next(id)
  }

}