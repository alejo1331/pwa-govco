import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class DetalleMomentosDeVidaService {

  private id_momento$ = new BehaviorSubject<string>('');

  constructor() { }

  get getIdMomento$(): Observable<string> {
    return this.id_momento$.asObservable();
  }
  // Set para asignar id del momento de vida
  setIdMomento(id: string): void {
    this.id_momento$.next(id)
  }

  get getIdMomento(): string {
    return this.id_momento$.getValue();
  }
}