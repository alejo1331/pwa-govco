import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class DetalleMomentosDeVidaService {

  private id_momento$ = new BehaviorSubject<string>('');
  private selectd_item$ = new BehaviorSubject<number>(0);
  private nombreMomento = '';

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

  // El siguiente fragmento de codigo permite capturar y leer el item seleccionado para la 
  // barra horizontal (lo mas consultado, tramites destacados, todos los tramites y actualidad)

  setItemBarra(index: number): void {
    this.selectd_item$.next(index);
  }

  get getItemBarra$(): Observable<number> {
    return this.selectd_item$.asObservable();
  }


  get getNombreMomento(): string {
    return this.nombreMomento;
  }

  setNombreMomento(descripcion: string): void {
    this.nombreMomento = descripcion;
  }
}